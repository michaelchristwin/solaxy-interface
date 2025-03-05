import { useState } from "react";
import { ArrowDownUp, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const tokens = [
  { symbol: "ETH", name: "Ethereum", logo: "/api/placeholder/40/40" },
  { symbol: "USDC", name: "USD Coin", logo: "/api/placeholder/40/40" },
  { symbol: "DAI", name: "Dai Stablecoin", logo: "/api/placeholder/40/40" },
];

const SwapInterface = () => {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const handleTokenSelect = (
    token: { symbol: string; name: string; logo: string } | undefined,
    isFrom: boolean
  ) => {
    if (token) {
      if (isFrom) setFromToken(token);
      else setToToken(token);
    }
  };

  return (
    <Card className="w-96 p-4 bg-white shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Swap</h2>
        <Settings className="text-gray-500 cursor-pointer" />
      </div>

      <div className="mb-2 relative">
        <Input
          type="number"
          value={fromAmount}
          onChange={(e) => setFromAmount(e.target.value)}
          placeholder="0.0"
          className="w-full p-3 border rounded-lg text-right"
        />
        <div className="absolute top-2 left-2 flex items-center">
          <img
            src={fromToken.logo}
            alt={fromToken.symbol}
            className="w-6 h-6 mr-2"
          />
          <select
            value={fromToken.symbol}
            onChange={(e) => {
              const selected = tokens.find((t) => t.symbol === e.target.value);
              handleTokenSelect(selected, true);
            }}
            className="bg-transparent"
          >
            {tokens.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center my-2">
        <button
          onClick={switchTokens}
          className="bg-gray-100 rounded-full p-2 hover:bg-gray-200"
        >
          <ArrowDownUp />
        </button>
      </div>

      <div className="mb-4 relative">
        <Input
          type="number"
          value={toAmount}
          onChange={(e) => setToAmount(e.target.value)}
          placeholder="0.0"
          className="w-full p-3 border rounded-lg text-right"
        />
        <div className="absolute top-2 left-2 flex items-center">
          <img
            src={toToken.logo}
            alt={toToken.symbol}
            className="w-6 h-6 mr-2"
          />
          <select
            value={toToken.symbol}
            onChange={(e) => {
              const selected = tokens.find((t) => t.symbol === e.target.value);
              handleTokenSelect(selected, false);
            }}
            className="bg-transparent"
          >
            {tokens.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Connect Wallet
      </Button>
    </Card>
  );
};

export default SwapInterface;
