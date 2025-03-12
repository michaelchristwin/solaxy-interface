import { SLX } from "@/assets/token-logos";
import { TokenStruct, TransactionTab } from "@/providers/app.context-provider";

interface ActionButtonTextProps {
  activeTab: TransactionTab;
  selectedToken: TokenStruct;
}
const ActionButtonText = ({
  activeTab,
  selectedToken,
}: ActionButtonTextProps) => {
  if (activeTab === "mint") {
    return (
      <div className={`w-full flex items-center justify-center space-x-1.5`}>
        <p>Mint SLX</p>
        <div className="w-[22px] h-[22px] rounded-full overflow-hidden flex-shrink-0">
          <img
            src={SLX}
            alt={`SLX logo`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={`w-full flex items-center justify-center space-x-1.5`}>
        <p>Collect {selectedToken.symbol}</p>
        <div className="w-[22px] h-[22px] rounded-full overflow-hidden flex-shrink-0">
          <img
            src={selectedToken.logo}
            alt={`${selectedToken.symbol} logo`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }
};

export default ActionButtonText;
