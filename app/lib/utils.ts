import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateFontSize = (length: number) => {
  const maxFontSize = 24; // Default size
  const minFontSize = 12; // Minimum size
  const breakpoint = 8; // Characters before scaling starts

  if (length <= breakpoint) return maxFontSize;
  return Math.max(minFontSize, maxFontSize - (length - breakpoint) * 0.8);
};
