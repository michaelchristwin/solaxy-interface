import { useState } from "react";
import { USDC, USDT, WETH, DAI, WBTC, ETH, USD3 } from "@/assets/token-logos";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

type TokenStruct = {
  symbol: string;
  address: string;
  logo: string;
  balance: string;
};

const tokens: TokenStruct[] = [
  {
    symbol: "USD3",
    address: "",
    logo: USD3,
    balance: "0.00",
  },
  {
    symbol: "ETH",
    address: "0xEeee...EEeE",
    logo: ETH,
    balance: "0.00",
  },
  { symbol: "WETH", address: "0xC02a...6Cc2", logo: WETH, balance: "0.00" },
  { symbol: "USDC", address: "0xA0b8...eB48", logo: USDC, balance: "0.00" },
  { symbol: "USDT", address: "0xdAC1...1ec7", logo: USDT, balance: "0.00" },
  { symbol: "DAI", address: "0x6B17...1d0F", logo: DAI, balance: "0.00" },
  {
    symbol: "WBTC",
    address: "0x2260...C599",
    logo: WBTC,
    balance: "0.00",
  },
];

function TokensPopup() {
  const [selectedToken, setSelectedToken] = useState<TokenStruct>({
    symbol: "USDC",
    address: "0xA0b8...eB48",
    logo: USDC,
    balance: "0.00",
  });

  const [open, setOpen] = useState(false);

  const handleTokenSelect = (token: TokenStruct) => {
    setSelectedToken(token);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-around w-40 rounded-full"
        >
          <img
            src={selectedToken.logo}
            alt={`${selectedToken.symbol} logo`}
            className="w-6 h-6 rounded-full"
          />
          <span>{selectedToken.symbol}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:w-96 md:w-96 w-80 h-[500px] overflow-y-auto p-5 gap-y-0">
        <p className="text-2xl font-bold block mb-2">Mint using</p>
        <div className="space-y-1">
          {tokens.map((token) => (
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
                    {token.address}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-2">{token.balance}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TokensPopup;
