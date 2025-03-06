import { SLX } from "../assets/token-logos";
import TokensPopup from "./tokens-popup";

interface TokenInputProps {
  label: string;
  balance: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
  tokenType: "stable" | "slx";
}

const TokenInput: React.FC<TokenInputProps> = ({
  label,
  balance,
  value,
  onChange,
  isReadOnly = false,
  tokenType,
}) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {label}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          Balance: {balance}
        </span>
      </div>
      <div className="flex items-center mb-1">
        <div className="mr-2">
          {tokenType === "stable" ? (
            <TokensPopup />
          ) : (
            <div className="py-2 px-3 bg-white dark:bg-gray-700 font-medium flex items-center justify-center space-x-2 lg:w-40 md:w-40 w-[120px] rounded-[30px] border">
              <div className="w-[22px] h-[22px] rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={SLX}
                  alt="SLX logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span>SLX</span>
            </div>
          )}
        </div>
        <input
          type="text"
          className="text-right text-2xl font-medium bg-transparent outline-none flex-1 text-gray-800 dark:text-gray-100"
          placeholder="0.00"
          value={value}
          onChange={onChange}
          readOnly={isReadOnly}
        />
      </div>
    </div>
  );
};

export default TokenInput;
