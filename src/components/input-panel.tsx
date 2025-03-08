import { TransactionTab } from "@/providers/app.context-provider";
import { calculateFontSize } from "@/lib/utils";
import TokensPopup from "./tokens-popup";

interface InputPanelProps {
  getInputLabel: () => string;
  activeTab: TransactionTab;
  isReversed: boolean;
  outputAmount: string;
  inputAmount: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  balance?: string;
  isLoading: boolean;
}

function InputPanel({
  getInputLabel,
  activeTab,
  isReversed,
  handleInputChange,
  inputAmount,
  outputAmount,
  balance,
  isLoading,
}: InputPanelProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex w-full items-center space-x-1.5">
      <div className="block space-y-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 block">
          {getInputLabel()}
        </span>
        <div className="">
          <TokensPopup />
        </div>
      </div>
      <div className="block space-y-2">
        <span className="text-xs text-end text-gray-400 dark:text-gray-500 block">
          {activeTab === "buy" &&
            `Balance: ${!balance || isLoading ? "0.00" : balance}`}
        </span>
        <input
          type="text"
          className="text-right w-full max-w-md overflow-hidden whitespace-nowrap font-medium bg-transparent outline-none text-gray-800 dark:text-gray-100"
          placeholder="0.00"
          value={isReversed ? outputAmount : inputAmount}
          readOnly={isReversed}
          onChange={!isReversed ? handleInputChange : () => {}}
          style={{
            fontSize: `${calculateFontSize(inputAmount.length)}px`,
            transition: "font-size 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

export default InputPanel;
