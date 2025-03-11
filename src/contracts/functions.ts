import { config } from "@/config";
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { solaxyContract, assetContract } from ".";
import { Address, parseEther } from "viem";

type Result<T, E = Error> = [E, null] | [null, T];

export const safeDeposit = async (
  assets: bigint,
  reciepientAddress: Address,
  amount: string
): Promise<Result<`0x${string}`>> => {
  try {
    const hash = await writeContract(config, {
      ...solaxyContract,
      functionName: "safeDeposit",
      args: [assets, reciepientAddress, parseEther(amount)],
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

export const safeMint = async (
  shares: bigint,
  reciepientAddress: Address,
  amount: string
): Promise<Result<`0x${string}`>> => {
  try {
    const hash = await writeContract(config, {
      ...solaxyContract,
      functionName: "safeMint",
      args: [shares, reciepientAddress, parseEther(amount)],
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
  shares: bigint,
  reciepientAdress: Address,
  address: Address,
  amount: string
): Promise<Result<`0x${string}`>> => {
  try {
    const hash = await writeContract(config, {
      ...solaxyContract,
      functionName: "safeRedeem",
      args: [shares, reciepientAdress, address, parseEther(amount)],
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

export const safeWithdraw = async (
  assets: bigint,
  reciepientAdress: Address,
  address: Address,
  amount: string
): Promise<Result<`0x${string}`>> => {
  try {
    const hash = await writeContract(config, {
      ...solaxyContract,
      functionName: "safeWithdraw",
      args: [assets, reciepientAdress, address, parseEther(amount)],
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

export const checkAllowance = async (
  owner: Address,
  spender: Address
): Promise<Result<bigint>> => {
  try {
    const data = await readContract(config, {
      ...assetContract,
      functionName: "allowance",
      args: [owner, spender],
    });
    return [null, data as bigint];
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), null];
  }
};
