import "~/app.css";
import React, { useState, useMemo, useEffect } from "react";
import { RefreshCcw, Settings, Info } from "lucide-react";
import { useAccount, useReadContracts } from "wagmi";
import {
  writeContract as asyncWriteContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import {
  type TransactionTab,
  useAppContext,
} from "~/providers/app.context-provider";
import { SLX } from "~/assets/token-logos";
import ActionButtonText from "~/components/ActionButtonText";
import { ConnectKitButton } from "connectkit";
import OutputPanel from "~/components/OutputPanel";
import InputPanel from "~/components/InputPanel";
import { assetContract, solaxyContract } from "~/contracts";
import { type Address, formatUnits, parseEther } from "viem";
import { Input } from "~/components/ui/input";
import { config } from "~/config";
import {
  checkAllowance,
  safeDeposit,
  safeMint,
  safeRedeem,
  safeWithdraw,
} from "~/contracts/functions";

const TradeInterface: React.FC = () => {
  const {
    activeTab,
    inputMode,
    setActiveTab,
    setInputMode,
    selectedToken,
    setTransactionMode,
    transactionMode,
  } = useAppContext();
  const { isConnected, address } = useAccount();
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [reciepientAdress, setReciepientAdress] = useState("");
  const [slippageTolerance, setSlippageTolerance] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const exchangeRates = useMemo(
    () => ({
      mint: {
        stable: 1.25, // 1 USDC = 1.25 SLX
        slx: 0.8, // 1 SLX = 0.8 USDC
      },
      melt: {
        stable: 0.8, // 1 SLX = 0.8 USDC
        slx: 1.25, // 1 USDC = 1.25 SLX
      },
    }),
    []
  );

  // Calculate output amount based on input
  const {
    data: readContractsData,
    refetch,
    isLoading,
  } = useReadContracts({
    contracts: [
      {
        ...assetContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...solaxyContract,
        functionName: "balanceOf",
        args: [address],
      },
      {
        ...solaxyContract,
        functionName: "previewWithdraw",
        args: [parseEther(inputAmount)],
      },
      {
        ...solaxyContract,
        functionName: "previewMint",
        args: [parseEther(inputAmount)],
      },
      {
        ...solaxyContract,
        functionName: "previewDeposit",
        args: [parseEther(inputAmount)],
      },
      {
        ...solaxyContract,
        functionName: "previewRedeem",
        args: [parseEther(inputAmount)],
      },
    ],
  });

  const sDAIBalance = readContractsData?.[0].result as bigint | undefined;
  const solaxyBalance = readContractsData?.[1].result as bigint | undefined;
  const withdrawable_assets = readContractsData?.[2].result as
    | bigint
    | undefined; // previewWithdraw
  const mintable_shares = readContractsData?.[3].result as bigint | undefined; // previewMint
  const depositable_assets = readContractsData?.[4].result as
    | bigint
    | undefined; // previewDeposit
  const redeemable_shares = readContractsData?.[5].result as bigint | undefined; // previewRedeem

  const calculateOutputAmount = (input: string): string => {
    if (!input || input === "0") return "";
    if (activeTab === "mint") {
      if (isReversed) {
        if (mintable_shares) {
          return Number(formatUnits(mintable_shares, 18)).toFixed(8);
        }
      } else {
        if (depositable_assets) {
          return Number(formatUnits(depositable_assets, 18)).toFixed(8);
        }
      }
    } else {
      if (isReversed) {
        if (redeemable_shares) {
          return Number(formatUnits(redeemable_shares, 18)).toFixed(8);
        }
      } else {
        if (withdrawable_assets) {
          return Number(formatUnits(withdrawable_assets, 18)).toFixed(8);
        }
      }
    }

    return "";
  };

  useEffect(() => {
    if (inputAmount) {
      refetch();
    }
  }, [inputAmount, refetch]);

  useEffect(() => {
    setOutputAmount(calculateOutputAmount(inputAmount));
  }, [inputAmount, activeTab, inputMode, readContractsData, isReversed]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInputAmount(value);
    }
  };

  function formatTokenAmount(amount?: bigint, decimals = 18) {
    if (!amount) {
      return "0.00";
    }
    // Format the token amount with the specified number of decimals
    const formattedAmount = formatUnits(amount, decimals);
    // Convert to a number and format to 2 decimal places
    return Number(formattedAmount).toFixed(2);
  }

  const toggleInputMode = () => {
    setInputMode(inputMode === "stable" ? "slx" : "stable");
    setTransactionMode(transactionMode === "mint" ? "melt" : "mint");
    setActiveTab(isReversed ? "mint" : "melt");
    setInputAmount(outputAmount);
    setOutputAmount(inputAmount);
    setIsReversed((p) => !p);
  };

  // Calculate transaction details
  const slippage = useMemo(() => {
    if (!outputAmount) return "0.000000";
    if (activeTab === "mint") {
      if (isReversed) {
        return (
          parseFloat(outputAmount) +
          parseFloat(outputAmount) * slippageTolerance
        ).toFixed(6);
      } else {
        return (
          parseFloat(outputAmount) -
          parseFloat(outputAmount) * slippageTolerance
        ).toFixed(6);
      }
    } else {
      if (isReversed) {
        return (
          parseFloat(outputAmount) -
          parseFloat(outputAmount) * slippageTolerance
        ).toFixed(6);
      } else {
        return (
          parseFloat(outputAmount) +
          parseFloat(outputAmount) * slippageTolerance
        ).toFixed(6);
      }
    }
  }, [outputAmount, slippageTolerance, activeTab, isReversed]);

  const conversionRate = useMemo(() => {
    const rate = exchangeRates[transactionMode][inputMode];
    return inputMode === "stable"
      ? `1 USDC ≈ ${rate} SLX`
      : `1 SLX ≈ ${rate} USDC`;
  }, [activeTab, inputMode, exchangeRates]);

  // Get input and output labels based on token positions and active tab
  const getInputLabel = () => {
    if (activeTab === "mint") {
      // Buy mode
      return "You spend";
    } else {
      // Sell mode

      return "You collect";
    }
  };

  const getOutputLabel = () => {
    if (activeTab === "mint") {
      // Buy mode
      return "You mint";
    } else {
      // Sell mode
      return "You spend";
    }
  };

  const getSlippageLabel = () => {
    if (activeTab === "mint") {
      if (inputMode === "stable") return "Min mint:";
      return "Max spend:";
    } else {
      if (inputMode === "stable") return "Max melt";
      return "Min collect";
    }
  };

  // console.log("inputAmount: ", inputAmount);
  // console.log("outputAmount: ", outputAmount);
  // console.log("depositable_assets: ", depositable_assets);
  // console.log("mintable_shares: ", mintable_shares);
  // console.log("withdrawable_assets: ", withdrawable_assets);
  // console.log("redeemable_shares: ", redeemable_shares);
  // console.log("Slippage: ", slippage);
  const sendTransaction = async () => {
    try {
      setIsPending(true);
      if (activeTab === "mint") {
        const [error, allowance] = await checkAllowance(
          address as Address,
          solaxyContract.address
        );
        if (error) {
          throw error;
        }
        // console.log("allowance: ", allowance);
        if (Number(inputAmount) > Number(formatUnits(allowance, 18))) {
          const approveResult = await asyncWriteContract(config, {
            ...assetContract,
            functionName: "approve",
            args: [
              solaxyContract.address,
              parseEther(isReversed ? slippage : inputAmount),
            ],
          });
          const receipt = await waitForTransactionReceipt(config, {
            hash: approveResult,
          });
          if (receipt.status === "reverted") {
            throw new Error("Transaction reverted");
          }
        }

        if (isReversed) {
          await safeMint(
            parseEther(inputAmount),
            (reciepientAdress || address) as Address,
            slippage
          );
        } else {
          await safeDeposit(
            parseEther(inputAmount),
            (reciepientAdress || address) as Address,
            slippage
          );
        }
      } else {
        if (isReversed) {
          await safeRedeem(
            parseEther(inputAmount),
            (reciepientAdress || address) as Address,
            address as Address,
            slippage
          );
        } else {
          await safeWithdraw(
            parseEther(inputAmount),
            address as Address,
            (reciepientAdress || address) as Address,
            slippage
          );
        }
      }
      setIsPending(false);
    } catch (error) {
      console.error("Transaction failed:", error);
      setIsPending(false);
    }
  };

  const bgColors = {
    melt: "bg-gradient-to-br from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 dark:from-red-600 dark:to-yellow-500 dark:hover:from-red-700 dark:hover:to-yellow-600",
    mint: "bg-gradient-to-br from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 dark:from-green-600 dark:to-yellow-500 dark:hover:from-green-700 dark:hover:to-yellow-600",
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden flex-shrink-0">
            <img
              src={SLX}
              alt={`SLX logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            SOLAXY
          </h1>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-6">
        {([activeTab, "bridge"] as TransactionTab[]).map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2.5 rounded-md font-medium transition-all ${
              activeTab === tab
                ? "bg-white dark:bg-gray-700 text-yellow-600 dark:text-yellow-400 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Transaction Interface */}
      <div
        className={`gap-y-3 relative flex ${
          isReversed ? "flex-col-reverse" : "flex-col"
        }`}
      >
        {/* Input Panel */}
        <InputPanel
          handleInputChange={handleInputChange}
          inputAmount={inputAmount}
          outputAmount={outputAmount}
          isReversed={isReversed}
          getInputLabel={getInputLabel}
          activeTab={activeTab}
          balance={formatTokenAmount(sDAIBalance as bigint)}
          isLoading={isLoading}
        />
        {/* Mode Toggle Button */}
        <div className="flex justify-center -my-1 z-10 absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
          <button
            onClick={toggleInputMode}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            <RefreshCcw className="w-4 h-4 text-yellow-600 dark:text-yellow-400 active:animate-spin" />
          </button>
        </div>

        {/* Output Panel */}
        <OutputPanel
          handleInputChange={handleInputChange}
          outputAmount={outputAmount}
          inputAmount={inputAmount}
          isReversed={isReversed}
          getOutputLabel={getOutputLabel}
          activeTab={activeTab}
          balance={formatTokenAmount(solaxyBalance as bigint)}
          isLoading={isLoading}
        />
      </div>

      {/* Rate information */}
      <div className="mt-3 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 px-1">
        <div className="flex items-center">
          <span>{conversionRate}</span>
          <Info className="w-3 h-3 ml-1 text-gray-400" />
        </div>
      </div>

      {/* Transaction Settings - Toggleable */}
      {showSettings && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-3">
          <Input
            className=""
            type="text"
            placeholder="receipient address"
            onChange={(e) => setReciepientAdress(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Slippage Tolerance
            </span>
            <div className="flex space-x-1">
              {[0.1, 0.5, 1.0].map((value) => (
                <button
                  key={value}
                  className={`px-3 py-1 rounded-md text-xs transition-colors ${
                    slippageTolerance === value
                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                  onClick={() => setSlippageTolerance(value)}
                >
                  {value}%
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>{getSlippageLabel()}</span>
            <span>
              {slippage} {inputMode === "stable" ? "SLX" : selectedToken.symbol}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>Price impact:</span>
            <span className="text-green-600 dark:text-green-400">
              &lt; 0.01%
            </span>
          </div>
        </div>
      )}

      {/* Action Button */}
      {isConnected ? (
        <button
          className={`w-full mt-6 space-x-1 py-3.5 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${bgColors[transactionMode]}`}
          onClick={sendTransaction}
          disabled={!inputAmount || parseFloat(inputAmount) === 0 || isPending}
        >
          <ActionButtonText {...{ activeTab, selectedToken }} />
        </button>
      ) : (
        <ConnectKitButton.Custom>
          {({ show }) => {
            return (
              <button
                onClick={show}
                className={`w-full bg-neutral-800 text-white h-[44px] my-2 rounded-lg text-center`}
              >
                Connect Wallet
              </button>
            );
          }}
        </ConnectKitButton.Custom>
      )}

      {/* Footer */}
    </div>
  );
};

export default TradeInterface;
