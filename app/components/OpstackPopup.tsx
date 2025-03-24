import { useState } from "react";
import {
  Base,
  Celo,
  Ethereum,
  Ink,
  Lisk,
  Optimism,
  Sonieum,
  Unichain,
  World_Chain,
} from "~/assets/chains";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

// Define token groups
const OpChains = [
  {
    name: "Ethereum",
    image: Ethereum,
  },
  {
    name: "Optimism Mainnet",
    image: Optimism,
  },
  {
    name: "Base",
    image: Base,
  },
  {
    name: "Unichain",
    image: Unichain,
  },
  {
    name: "World chain",
    image: World_Chain,
  },
  {
    name: "Ink",
    image: Ink,
  },
  {
    name: "Soneium",
    image: Sonieum,
  },
  {
    name: "Lisk",
    image: Lisk,
  },
  {
    name: "Celo",
    image: Celo,
  },
];

interface OpstackPopupProps {
  children: React.ReactNode;
}

// Flatten tokens for convenience
//const allTokens = tokenGroups.flatMap((group) => group.tokens);

const OpstackPopup: React.FC<OpstackPopupProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:w-96 md:w-96 w-80 h-[500px] overflow-y-auto p-5 gap-y-0 poppins">
        <p className="text-2xl font-bold block mb-3">Select Chain</p>
        <div className="space-y-4">
          {OpChains.map((chain) => (
            <div
              key={chain.name}
              className="space-y-1 flex items-center justify-between"
            >
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                {chain.name}
              </h3>
              <div
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => {}}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={chain.image}
                      alt={`${chain.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpstackPopup;
