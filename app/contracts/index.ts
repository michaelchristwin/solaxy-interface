import SolaxyABI from "~/contracts/ABIs/solaxy-abi.json";
import MyTokenABI from "~/contracts/ABIs/dummy-token.json";
import { parseAbi } from "viem";

export const solaxyContract = {
  address: "0x65AC402ea05667EF898CbF63EeBFe58A8BAB9A4e",
  abi: SolaxyABI,
} as const;

export const assetContract = {
  address: "0x44d4a6d9384F494275aE04d7cE13f6d3a666797e",
  abi: MyTokenABI,
} as const;

// const usd3Dummy = "0x44d4a6d9384F494275aE04d7cE13f6d3a666797e";
// const m3terNFT = "0xeabCA3f59d6C7D54Ab2A8d08a674E2EE691eA6C5";
// const solaxy = "0x65AC402ea05667EF898CbF63EeBFe58A8BAB9A4e";

const human_readable_abi = [
  "function estimateZapIn(address token, uint256 amount, uint256 slx) external view returns(uint256)",
  "function estimateZapOut(address token, uint256 amount, uint256 slx) external view returns(uint256)",
  "function zapIn(address token, uint256 amount, uint256 slx, address receiver) external payable returns(uint256 shares)",
  "function zapOut(address token, uint256 amount, uint256 slx, address receiver) external returns(uint256 assets)",
] as const;
export const abi = parseAbi(human_readable_abi);
