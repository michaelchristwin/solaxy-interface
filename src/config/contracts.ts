import SolaxyABI from "@/ABIs/solaxy-abi.json";
import sDAI_ABI from "@/ABIs/sdai-abi.json";

export const solaxyContract = {
  address: "0x6939abe16d783309dec7ff7b7c0631929d7ec1be",
  abi: SolaxyABI,
} as const;

export const sDAIContract = {
  address: "0xaf204776c7245bF4147c2612BF6e5972Ee483701",
  abi: sDAI_ABI,
} as const;
