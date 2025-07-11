import Marquee from "react-fast-marquee";
import { Link } from "react-router";
import { Sponsors } from "~/assets/sponsors";
import { SLX } from "~/assets/token-logos";
import BrowserOnly from "~/components/BrowserOnly";
import FAQMenu from "~/components/FaqMenu";
import GemAnimation from "~/components/GemAnimation";
import HeroText from "~/components/HeroText";
import TradeInterface from "~/components/TradeInterface";
import styles from "./_index.module.css";

export function meta() {
	return [
		{ title: "Solaxy" },
		{ name: "description", content: "One token to rule them all!" },
	];
}

export default function Index() {
	return (
		<div className="w-full relative">
			<GemAnimation />
			{/* Hero Section */}

			<div className="w-full min-h-[400px] flex justify-center items-center lg:mt-32 md:mt-28 mt-20">
				<div className="block space-y-10 w-[90%] sm:w-[85%] md:w-[80%] mx-auto">
					<div className="block ibm-plex-mono lg:text-start md:text-start text-center">
						<p className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-neutral-800">
							Asset
						</p>
						<HeroText />
					</div>
					<Link
						to={`#trade`}
						className="w-64 text-xl rounded-full h-16 bg-black hover:bg-gray-900 text-white shadow-lg transition-all duration-300 ease-in-out flex justify-center items-center space-x-2 lg:mx-0 md:mx-0 mx-auto"
					>
						<span>Visit Foundry</span>
						<img alt="Solaxy logo" src={SLX} className="w-5 h-5" />
					</Link>
				</div>
			</div>
			{/** biome-ignore lint/nursery/useUniqueElementIds: <Id is used for naviagtion> */}
			<div
				id="trade"
				className="w-full lg:mt-[300px] md:mt-[200px] mt-[150px] p-4"
			>
				<TradeInterface />
			</div>
			<FAQMenu />
			<div
				className={`mt-[100px] w-full relative block py-[40px] px-2 space-y-[80px] bg-white`}
			>
				<p className={`block mx-auto text-center font-bold text-[23px]`}>
					Special thanks to
				</p>
				<BrowserOnly>
					<Marquee autoFill speed={80}>
						{Sponsors.map((sponsor) => (
							<img
								key={sponsor}
								src={sponsor}
								alt="Logo"
								className={styles.brand}
							/>
						))}
					</Marquee>
				</BrowserOnly>
			</div>
		</div>
	);
}
