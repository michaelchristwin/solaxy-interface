import { useState } from "react";
import { USDC, USDT, DAI, WBTC, ETH, USD3 } from "~/assets/token-logos";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import {
  type TokenStruct,
  useAppContext,
} from "~/providers/app.context-provider";

// Define token groups
const tokenGroups = [
  {
    name: "Popular",
    tokens: [
      {
        symbol: "ETH",
        address: "0x34a9c05b638020a07bb153bf624c8763bf8b4a86",
        logo: ETH,
        balance: "0.00",
      },
      {
        symbol: "WBTC",
        address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
        logo: WBTC,
        balance: "0.00",
      },
    ],
  },
  {
    name: "USD",
    tokens: [
      {
        symbol: "USDC",
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        logo: USDC,
        balance: "0.00",
      },
      {
        symbol: "USDT",
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        logo: USDT,
        balance: "0.00",
      },
      {
        symbol: "DAI",
        address: "0x6b175474e89094c44da98b954eedeac495271d0f",
        logo: DAI,
        balance: "0.00",
      },
    ],
  },
  {
    name: "Advanced (saves gas)",
    tokens: [
      {
        symbol: "USD3",
        address: "0x0d86883FAf4FfD7aEb116390af37746F45b6f378",
        logo: USD3,
        balance: "0.00",
      },
    ],
  },
];

interface OpstackPopupProps {
  children: React.ReactNode;
}

// Flatten tokens for convenience
//const allTokens = tokenGroups.flatMap((group) => group.tokens);

const OpstackPopup: React.FC<OpstackPopupProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { selectedToken, setSelectedToken } = useAppContext();

  const handleTokenSelect = (token: TokenStruct) => {
    setSelectedToken(token);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:w-96 md:w-96 w-80 h-[500px] overflow-y-auto p-5 gap-y-0 poppins">
        <p className="text-2xl font-bold block mb-3">Select preference</p>
        <div className="space-y-4">
          {tokenGroups.map((group) => (
            <div key={group.name} className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                {group.name}
              </h3>
              {group.tokens.map((token) => (
                <div
                  key={token.symbol}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => handleTokenSelect(token)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={token.logo}
                        alt={`${token.symbol} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{token.symbol}</span>
                      <span className="text-xs text-gray-500 truncate max-w-40">
                        {token.address.slice(0, 8)}...{token.address.slice(-7)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">{token.balance}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpstackPopup;
