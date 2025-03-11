import { config } from "@/config";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { solaxyContract } from ".";
import { Address, parseEther } from "viem";

type Result<T, E = Error> = [E, null] | [null, T];

export const safeMint = async (
  address: Address,
  shares: bigint,
  amount: string
): Promise<Result<`0x${string}`>> => {
  try {
    const hash = await writeContract(config, {
      ...solaxyContract,
      functionName: "safeMint",
      args: [parseEther(amount), address, shares],
    });

    const result = await waitForTransactionReceipt(config, { hash });

    if (result.status === "reverted") {
      throw new Error("Transaction reverted");
    }

    return [null, hash];
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), null];
  }
};

export const safeDeposit = async (
  address: Address,
  assets: bigint,
  amount: string
): Promise<Result<`0x${string}`>> => {
  try {
    const hash = await writeContract(config, {
      ...solaxyContract,
      functionName: "safeDeposit",
      args: [parseEther(amount), address, assets],
    });
    const result = await waitForTransactionReceipt(config, { hash });

    if (result.status === "reverted") {
      throw new Error("Transaction reverted");
    }

    return [null, hash];
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), null];
  }
};

export const safeRedeem = async (
  address: Address,
  shares: bigint,
  reciepientAdress: Address,
  amount: string
) => {
  try {
    const hash = await writeContract(config, {
      ...solaxyContract,
      functionName: "safeRedeem",
      args: [parseEther(amount), reciepientAdress, address, shares],
    });

    const result = await waitForTransactionReceipt(config, { hash });

    if (result.status === "reverted") {
      throw new Error("Transaction reverted");
    }
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), null];
  }
};

export const safeWithdraw = async (
  address: Address,
  assets: bigint,
  amount: string,
  reciepientAdress: Address
) => {
  try {
    const hash = await writeContract(config, {
      ...solaxyContract,
      functionName: "safeWithdraw",
      args: [parseEther(amount), reciepientAdress, address, assets],
    });

    const result = await waitForTransactionReceipt(config, { hash });

    if (result.status === "reverted") {
      throw new Error("Transaction reverted");
    }
  } catch (error) {}
};
