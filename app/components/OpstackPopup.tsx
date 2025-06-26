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
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "~/components/ui/dialog";
import type { ChainStruct } from "~/providers/app.context-provider";

// Define token groups
const OpChains = [
	{
		name: "Ethereum",
		image: Ethereum,
	},
	{
		name: "Op Mainnet",
		image: Optimism,
	},
	{
		name: "Base",
		image: Base,
	},
	{
		name: "Celo",
		image: Celo,
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
];

interface OpstackPopupProps {
	children: React.ReactNode;
	setSelectedChain: (chain: ChainStruct) => void;
}

const OpstackPopup: React.FC<OpstackPopupProps> = ({
	children,
	setSelectedChain,
}) => {
	const [open, setOpen] = useState(false);

	const handleClick = (chain: ChainStruct) => {
		setSelectedChain(chain);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="lg:w-96 md:w-96 w-80 min-h-[500px] p-5 gap-y-0 poppins">
				<DialogHeader>
					<DialogTitle className={`text-2xl font-bold block mb-5`}>
						Select Chain
					</DialogTitle>
					<DialogDescription className={`hidden`}></DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{OpChains.map((chain) => (
						// biome-ignore lint/a11y/noStaticElementInteractions: <I needed to>
						// biome-ignore lint/a11y/useKeyWithClickEvents: <I needed to>
						<div
							key={chain.name}
							className={`space-y-1 flex items-center space-x-3 hover:bg-gray-100 cursor-pointer`}
							onClick={() => handleClick(chain)}
						>
							<div className="flex items-center justify-between p-1  rounded-lg cursor-pointer">
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
							<h3 className="text-sm font-medium text-gray-500 mb-2">
								{chain.name}
							</h3>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default OpstackPopup;
