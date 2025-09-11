import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router";

interface FAQItem {
  id: number;
  question: string;
  answer: React.ReactNode;
}

const FAQMenu: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Wtf is solaxy?",
      answer: (
        <>
          Solaxy is an <b>ERC4626</b> vault that functions as a financial and
          health index asset for all projects on the m3tering protocol and
          tracks the overall performance of projects within the ecosystem.{" "}
          <br /> It also functions as a governance tool empowering holders with
          veto rights over governance decisions made by the m3terDAO.
        </>
      ),
    },
    {
      id: 2,
      question: "What determines the value of solaxy?",
      answer:
        "The value of Solaxy is determined by its linear bonding curve mechanism with a slope of 0.000025.\n\nThis means that each new token minted increases the price slightly by 0.25 pips, and each token melted decreases it similarly, thus creating a direct relationship between supply and price.",
    },
    {
      id: 3,
      question: "Why can't I mint or melt solaxy?",
      answer: (
        <>
          Only <b>m3ter-heads</b> (accounts that hold at least one m3ter NFT)
          are eligible to collect newly minted tokens or any underlying
          collateral from the vault.
          <br />
          This restriction ensures that only committed community members who
          have a vested interest in the ecosystem can influence Solaxy\'s
          supply.
        </>
      ),
    },
    {
      id: 4,
      question: "How do I bridge to a chain not included here?",
      answer: (
        <>
          Solaxy is deployed as a <b>superchainERC20</b> across all Ethereum
          layer-2 chains within the Optimism superchain. If you need to bridge
          to a chain that isn't currently supported, use alternative bridging
          solutions. While external bridging might be possible, note that these
          are not officially endorsed by the protocol and could carry extra
          risks or wait for Protocol Expansion. Future updates might include
          additional chains. It's best to check the latest protocol
          documentation or community channels for updates on chain support.
        </>
      ),
    },
    {
      id: 5,
      question: "How do I get more involved with the protocol?",
      answer: (
        <>
          Visit the{" "}
          <Link
            target="_blank"
            to="https://warpcast.com/~/channel/m3ter-heads"
            className="text-blue-500 hover:underline"
          >
            /m3ter-heads
          </Link>{" "}
          channel on Farcaster to start participating in discussions and start
          learning how you can be a part of the protocol developers, energy
          providers or governance via the M3terDAO.
          <br />
          <br />
          You can also join the weekly community call on our Discord to engage
          with other members of the community.
        </>
      ),
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 lg:mt-[150px] md:mt-[150px] mt-[120px] rounded-[16px] shadow-sm bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">FAQs</h2>
      <div className="divide-y divide-gray-200">
        {faqData.map((item) => (
          <div key={item.id} className="overflow-hidden">
            <button
              className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200"
              onClick={() => toggleItem(item.id)}
              aria-expanded={openItem === item.id}
            >
              <span
                className={`text-[17px] ${
                  openItem === item.id
                    ? "text-yellow-500 font-bold"
                    : "font-normal text-gray-900"
                }`}
              >
                {item.question}
              </span>
              <span className="text-gray-500 ml-2">
                {openItem === item.id ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </span>
            </button>
            {openItem === item.id && (
              <div className="p-4 text-[14px] whitespace-pre-line">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQMenu;
