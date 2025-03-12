import { TransactionTab } from "@/providers/app.context-provider";
import { calculateFontSize } from "@/lib/utils";
import { SLX } from "@/assets/token-logos";
import { Skeleton } from "./ui/skeleton";

interface OutputPaneProps {
  getOutputLabel: () => string;
  activeTab: TransactionTab;
  isReversed: boolean;
  outputAmount: string;
  inputAmount: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  balance?: string;
  isLoading: boolean;
}

function OutputPanel({
  getOutputLabel,
  activeTab,
  isReversed,
  outputAmount,
  balance,
  inputAmount,
  handleInputChange,
  isLoading,
}: OutputPaneProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex w-full items-center">
      <div className="block space-y-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {getOutputLabel()}
        </span>
        <div className="">
          <div className="lg:w-40 md:w-40 w-[120px] h-9 py-2 bg-white border dark:bg-gray-700 font-medium flex items-center justify-center space-x-2 rounded-[30px]">
            <div className="w-[22px] h-[22px] rounded-full overflow-hidden flex-shrink-0">
              <img
                src={SLX}
                alt={`SLX logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <span>SLX</span>
          </div>
        </div>
      </div>
      <div className="block space-y-2">
        <span className="text-xs text-end text-gray-400 dark:text-gray-500 block">
          {activeTab === "melt" && `Balance: ${balance || "0.00"}`}
        </span>

        {!isReversed && isLoading ? (
          <Skeleton />
        ) : (
          <input
            type="text"
            readOnly={!isReversed}
            value={!isReversed ? outputAmount : inputAmount}
            onChange={isReversed ? handleInputChange : () => {}}
            className="text-right w-full max-w-md overflow-hidden whitespace-nowrap font-medium bg-transparent outline-none text-gray-800 dark:text-gray-100"
            placeholder="0.00"
            style={{
              fontSize: `${calculateFontSize(outputAmount.length)}px`,
              transition: "font-size 0.3s ease",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default OutputPanel;
