import { Link } from "react-router";
import { FaDiscord, FaSquareXTwitter } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";
import {
  Coingecko,
  Coinmarketcap,
  CowSwap,
  Etherscan,
  Jumper,
  Opensea,
  Reserve,
  UniSwap,
} from "~/assets/brands";

const socialLinks = [
  {
    href: "https://discord.gg/afFvdhW4",
    icon: <FaDiscord className="h-[50px] rounded-[15%] w-[50px]" />,
  },
  {
    href: "https://warpcast.com/~/channel/m3ter-heads",
    icon: <SiFarcaster className="h-[50px] rounded-[15%] w-[50px]" />,
  },
  {
    href: "https://x.com/M3tering",
    icon: <FaSquareXTwitter className="h-[50px] rounded-[15%] w-[50px]" />,
  },
];

const exchanges = [
  { href: "https://app.uniswap.org/", src: UniSwap, alt: "Uniswap" },
  { href: "https://swap.cow.fi/", src: CowSwap, alt: "Cowswap" },

  { href: "https://jumper.exchange/", src: Jumper, alt: "Jumper Exchange" },
];

const docs = [
  {
    href: "https://m3tering.whynotswitch.com/token-economics/mint-and-distribution",
    text: "Mint & Distribution",
  },

  {
    href: "https://m3tering.whynotswitch.com/smart-contracts/audits/secure3-audit-contest",
    text: "Audit",
  },
];

const contractAddresses = [
  {
    label: "Solaxy",
    contractAddress: "0x65AC402ea05667EF898CbF63EeBFe58A8BAB9A4e",
    links: [
      { href: "https://www.coingecko.com/", src: Coingecko, alt: "Coingecko" },
      {
        href: "https://coinmarketcap.com/",
        src: Coinmarketcap,
        alt: "Coinmarketcap",
      },
      { href: "https://etherscan.io/", src: Etherscan, alt: "Etherscan" },
    ],
  },
  {
    label: "M3ter",
    contractAddress: "0xeabCA3f59d6C7D54Ab2A8d08a674E2EE691eA6C5",
    links: [
      { href: "https://opensea.io/", src: Opensea, alt: "Opensea" },
      { href: "https://etherscan.io/", src: Etherscan, alt: "Etherscan" },
    ],
  },
  {
    label: "USD3",
    contractAddress: "0x0d86883faf4ffd7aeb116390af37746f45b6f378",
    links: [
      {
        href: "https://app.reserve.org/ethereum/token/0x0d86883faf4ffd7aeb116390af37746f45b6f378/issuance",
        src: Reserve,
        alt: "Reserve",
      },
    ],
  },
  {
    label: "Zap",
    contractAddress: "0x6781a0F84c7E9e846DCb84A9a5bd49333067b104",
    links: [
      { href: "https://etherscan.io/", src: Etherscan, alt: "Etherscan" },
    ],
  },
];

const sourceCodes = [
  {
    label: "Solaxy code repository",
    href: "https://github.com/m3tering/Solaxy",
  },

  {
    label: "Zap code repository",
    href: "https://github.com/zapproject/zap-monorepo",
  },
];

const Footer = () => (
  <footer className="w-full pt-[40px] text-white block bg-[rgba(64,64,64,0.8)] backdrop-blur-[8px]">
    <div className="max-w-full mx-auto grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] md:gap-[30px] px-10 py-5 gap-[20px]">
      <div>
        <FooterSection title="Socials">
          <div className="w-fit gap-[16px] grid [grid-template-columns:repeat(3,1fr)]">
            {socialLinks.map(({ href, icon }) => (
              <Link
                key={href}
                target="_blank"
                to={href}
                className="h-[50px] rounded-[15%] w-[50px]"
              >
                {icon}
              </Link>
            ))}
          </div>
        </FooterSection>

        <FooterSection title="Exchanges">
          <div className="w-fit gap-[16px] grid [grid-template-columns:repeat(3,1fr)]">
            {exchanges.map(({ href, src, alt }) => (
              <Link key={href} target="_blank" to={href}>
                <img
                  className="h-[50px] rounded-[15%] w-[50px]"
                  src={src}
                  alt={`${alt} Logo`}
                />
              </Link>
            ))}
          </div>
        </FooterSection>
      </div>

      <div>
        <FooterSection title="Docs">
          <ul className="list-none p-0 m-0">
            {docs.map(({ href, text }) => (
              <li key={href} className="mb-2.5">
                <Link
                  target="_blank"
                  to={href}
                  className="text-[#bdc3c7] no-underline text-sm transition-colors duration-300 ease-in-out flex items-center gap-2 hover:text-white"
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </FooterSection>

        <FooterSection title="Code">
          <ul className="list-none p-0 m-0">
            {sourceCodes.map(({ label, href }) => (
              <li key={label} className="mb-2.5">
                <Link
                  target="_blank"
                  to={href}
                  className="text-[#bdc3c7] no-underline text-sm transition-colors duration-300 ease-in-out flex items-center gap-2 hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterSection>
      </div>

      <div className="col-span-2 w-fit">
        <h3 className="text-[20px] font-semibold text-[#ecf0f1] mb-5">
          Smart Contracts
        </h3>
        {contractAddresses.map(({ label, links, contractAddress }) => (
          <div
            key={label}
            className="inline-flex flex-wrap w-full gap-1.5 mb-2.5 items-center text-[#bdc3c7] hover:text-white cursor-pointer"
          >
            <pre>
              <code className="text-[14px] font-light">{contractAddress}</code>
            </pre>
            <span className="text-wrap block font-semibold text-[14px]">
              {label}
            </span>
            <div className="gap-[7px] flex">
              {links.map(({ href, src, alt }) => (
                <Link key={href} target="_blank" to={href}>
                  <img
                    className="h-[20px] rounded-full w-[20px]"
                    src={src}
                    alt={`${alt} Logo`}
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="p-[10px] text-center">
      <p className="text-[14px] text-[#95a5a6] m-0">
        © {new Date().getFullYear()} M3tering Protocol.
      </p>
    </div>
  </footer>
);

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}
const FooterSection: React.FC<FooterSectionProps> = ({ title, children }) => (
  <div className="flex-1 min-w-[150px] mb-[30px] pr-[20px]">
    <h3 className="text-[20px] font-semibold mb-[20px] text-[#ecf0f1]">
      {title}
    </h3>
    {children}
  </div>
);

export default Footer;
