import TradeInterface from "~/components/TradeInterface";

export function meta() {
	return [
		{ title: "Trade SLX" },
		{ name: "description", content: "Buy and Sell SLX" },
	];
}

function Trade() {
	return (
		<div className={`flex justify-center items-center w-full`}>
			<TradeInterface />
		</div>
	);
}

export default Trade;
