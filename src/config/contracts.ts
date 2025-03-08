import SolaxyABI from "@/ABIs/solaxy-abi.json";
import sDAI_ABI from "@/ABIs/sdai-abi.json";

export const solaxyContract = {
  address: "0xF4F3c1666E750E014DE65c50d0e98B1263E678B8",
  abi: SolaxyABI,
} as const;

export const sDAIContract = {
  address: "0xaf204776c7245bF4147c2612BF6e5972Ee483701",
  abi: sDAI_ABI,
} as const;
