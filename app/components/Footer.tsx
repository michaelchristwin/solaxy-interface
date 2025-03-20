import { Link } from "react-router";
import { FaDiscord, FaSquareXTwitter } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";
import styles from "~/styles/layout.module.css";
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
    icon: <FaDiscord className={styles.footerSocials} />,
  },
  {
    href: "https://warpcast.com/~/channel/m3ter-heads",
    icon: <SiFarcaster className={styles.footerSocials} />,
  },
  {
    href: "https://x.com/M3tering",
    icon: <FaSquareXTwitter className={styles.footerSocials} />,
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
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div>
        <FooterSection title="Socials">
          <div className={styles.socialsList}>
            {socialLinks.map(({ href, icon }) => (
              <Link
                key={href}
                target="_blank"
                to={href}
                className={styles.footerSocials}
              >
                {icon}
              </Link>
            ))}
          </div>
        </FooterSection>

        <FooterSection title="Exchanges">
          <div className={styles.socialsList}>
            {exchanges.map(({ href, src, alt }) => (
              <Link key={href} target="_blank" to={href}>
                <img
                  className={styles.footerSocials}
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
          <ul className={styles.linksList}>
            {docs.map(({ href, text }) => (
              <li key={href}>
                <Link target="_blank" to={href}>
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </FooterSection>

        <FooterSection title="Code">
          <ul className={styles.linksList}>
            {sourceCodes.map(({ label, href }) => (
              <li key={label}>
                <Link target="_blank" to={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterSection>
      </div>

      <div className={styles.contractsGroup}>
        <h3 className={styles.groupTitle}>Smart Contracts</h3>
        {contractAddresses.map(({ label, links, contractAddress }) => (
          <div key={label} className={styles.contractsList}>
            <span>
              {label}-<code className={`font-normal`}>{contractAddress}</code>
            </span>

            <div className={styles.contractsListLogo}>
              {links.map(({ href, src, alt }) => (
                <Link key={href} target="_blank" to={href}>
                  <img
                    className={styles.footerIcon}
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

    <div className={styles.bottomBar}>
      <p className={styles.copyright}>
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
  <div className={styles.linksGroup}>
    <h3 className={styles.groupTitle}>{title}</h3>
    {children}
  </div>
);

export default Footer;
