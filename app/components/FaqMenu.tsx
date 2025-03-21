import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// Helper function to render answers with bullet points
const renderAnswer = (answer: string) => {
  // If the answer doesn't contain bullet points, return it as is
  if (!answer.includes("•") && !answer.includes("\n-")) {
    return <p className="text-gray-700">{answer}</p>;
  }

  // Split the answer by newlines
  const parts = answer.split("\n");
  const formattedParts = [];
  let currentList: string[] = [];
  let key = 0;

  // Process each line
  parts.forEach((part, _index) => {
    const trimmedPart = part.trim();

    // Check if this line is a bullet point
    if (trimmedPart.startsWith("•") || trimmedPart.startsWith("-")) {
      // Add the bullet point to the current list
      currentList.push(trimmedPart.substring(1).trim());
    } else {
      // If we have bullet points collected and this is not a bullet point
      if (currentList.length > 0) {
        // Add the bullet list to our formatted parts
        formattedParts.push(
          <ul key={key++} className="list-disc pl-5 mt-2 mb-2">
            {currentList.map((item, i) => (
              <li key={i} className="text-gray-700 mb-1">
                {item}
              </li>
            ))}
          </ul>
        );
        // Reset the current list
        currentList = [];
      }

      // Add non-bullet text if it's not empty
      if (trimmedPart) {
        formattedParts.push(
          <p key={key++} className="text-gray-700">
            {trimmedPart}
          </p>
        );
      }
    }
  });

  // Don't forget to add any remaining bullet points
  if (currentList.length > 0) {
    formattedParts.push(
      <ul key={key++} className="list-disc pl-5 mt-2">
        {currentList.map((item, i) => (
          <li key={i} className="text-gray-700 mb-1">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return <>{formattedParts}</>;
};

const FAQMenu: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Wtf is solaxy?",
      answer:
        "Solaxy is the financial and health index asset of the m3tering protocol. It tracks the overall performance of the projects within the ecosystem while also functioning as a governance tool. In essence, solaxy empowers holders—specifically m3ter-heads (those owning at least one m3ter NFT)—with veto rights over key decisions made by the m3terDAO.",
    },
    {
      id: 2,
      question: "What determines the value of solaxy?",
      answer: `The value of solaxy is determined by several factors:
• Index Asset Nature: It reflects the collective performance and health of the underlying m3tering projects.
• Bonding Curve Dynamics: Solaxy is minted using a linear bonding curve with a fixed slope of 0.000025, which influences its issuance and price.
• Ecosystem Growth and Governance: Market demand, protocol growth, and governance decisions made by m3ter-heads all play a role in its valuation.`,
    },
    {
      id: 3,
      question: "Why can't I mint or melt solaxy?",
      answer: `Only accounts that hold at least one m3ter NFT (i.e. m3ter-heads) are eligible to receive solaxy tokens through the vault. This restriction is built into the protocol to ensure that only active, engaged participants—those who have a stake in the ecosystem—can influence solaxy’s supply and stability. This design helps maintain the asset’s integrity and prevents arbitrary minting or melting by users who are not part of the core community.`,
    },
    {
      id: 4,
      question: "How do I bridge to a chain not included here?",
      answer: `Solaxy is deployed as a “superchainerc20” across all Ethereum layer‑2 chains within the Optimism superchain. If you need to bridge to a chain that isn’t currently supported, you have a few options:
    • Wait for Protocol Expansion: Future updates might include additional chains.
    • Alternative Bridging Solutions: While external bridging might be possible, note that these are not officially endorsed by the protocol and could carry extra risks.
    • It’s best to check the latest protocol documentation or community channels for updates on chain support.`,
    },
    {
      id: 5,
      question: "How do I get more involved with the protocol?",
      answer: `There are several ways to engage:
    • Acquire a m3ter NFT: This makes you eligible as a m3ter-head and gives you a voice in governance.
    • Participate in m3terDAO: Engage in voting and discussions to help steer the protocol’s decisions.
    • Join Community Channels: Follow the protocol on platforms like Discord, Twitter, or Telegram to stay informed and contribute.
    • Contribute to Development or Outreach: If you have technical or marketing skills, look for opportunities to help further the protocol’s reach and innovation.`,
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
              onClick={() => toggleItem(item.id)}
              aria-expanded={openItem === item.id}
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <span className="text-gray-500 ml-2">
                {openItem === item.id ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </span>
            </button>
            {openItem === item.id && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                {renderAnswer(item.answer)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQMenu;
