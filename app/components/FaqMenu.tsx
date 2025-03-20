import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQMenu: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign Up' button in the top right corner of our homepage. Fill in your details including your email address and password, then click 'Create Account'.",
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For enterprise customers, we also offer invoicing options.",
    },
    {
      id: 3,
      question: "How can I reset my password?",
      answer:
        "Click on the 'Forgot Password' link on the login page. Enter your email address and we'll send you instructions to reset your password. For security reasons, the reset link will expire after 24 hours.",
    },
    {
      id: 4,
      question: "What is your refund policy?",
      answer:
        "We offer a 30-day money-back guarantee on all our plans. If you're not satisfied with our service, contact our support team within 30 days of purchase for a full refund.",
    },
    {
      id: 5,
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team via email at support@example.com, through the live chat on our website, or by calling our toll-free number at 1-800-123-4567. Our support hours are Monday to Friday, 9am to 6pm EST.",
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
                <p className="text-gray-700">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQMenu;
