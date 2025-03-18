import { Link } from "react-router";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { SiFarcaster } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";
import styles from "~/styles/layout.module.css";
import {
  Coingecko,
  Coinmarketcap,
  CowSwap,
  Etherscan,
  Jumper,
  OneInch,
  Opensea,
  Reserve,
  UniSwap,
} from "~/assets/brands";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.linksGroup}>
          <h3 className={styles.groupTitle}>Socials</h3>
          <ul className={styles.linksList}>
            <li>
              <Link target="_blank" to="https://discord.gg/afFvdhW4">
                <FaDiscord className={styles.footerIcon} /> <span>Discord</span>
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://warpcast.com/~/channel/m3ter-heads"
              >
                <SiFarcaster className={styles.footerIcon} />
                <span>Farcaster</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://x.com/M3tering">
                <FaSquareXTwitter className={styles.footerIcon} />
                <span>X (formerly Twitter)</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://app.uniswap.org/">
                <img
                  className={styles.footerIcon}
                  src={UniSwap}
                  alt="Uniswap Logo"
                />
                <span>Uniswap</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://swap.cow.fi/">
                <img
                  className={styles.footerIcon}
                  src={CowSwap}
                  alt="Cowswap Logo"
                />
                <span>Cow swap</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://app.1inch.io">
                <img
                  className={styles.footerIcon}
                  src={OneInch}
                  alt="1Inch Logo"
                />
                <span>1inch</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://jumper.exchange/">
                <img
                  className={styles.footerIcon}
                  src={Jumper}
                  alt="Jumper Exchange Logo"
                />
                <span>Jumper exchange</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.linksGroup}>
          <h3 className={styles.groupTitle}>Docs</h3>
          <ul className={styles.linksList}>
            <li>
              <Link
                target="_blank"
                to="https://m3tering.whynotswitch.com/token-economics/mint-and-distribution"
              >
                Mint & Distribution
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://m3tering.whynotswitch.com/token-economics/burn-and-exit-fee"
              >
                Burn
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://m3tering.whynotswitch.com/smart-contracts/audits/secure3-audit-contest"
              >
                Audit
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.linksGroup}>
          <h3 className={styles.groupTitle}>Code</h3>
          <ul className={styles.linksList}>
            <li>
              <Link target="_blank" to="https://github.com/M3tering/Solaxy">
                <FaGithub className={styles.footerIcon} /> <span>Solaxy</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="/privacy">
                <img
                  className={styles.footerIcon}
                  src={Etherscan}
                  alt="Etherscan Logo"
                />
                <span>Solaxy ABI link</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="/cookies">
                Zap contract GitHub
              </Link>
            </li>
            <li>
              <Link target="_blank" to="/compliance">
                Zap ABI link
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://github.com/M3tering/Solaxy">
                <span>SLX contract</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="/privacy">
                <span> M3ter contract</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="/cookies">
                <span>USD3 contract</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="/compliance">
                <span>Zap contract</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.linksGroup}>
          <h3 className={styles.groupTitle}>Others</h3>
          <ul className={styles.linksList}>
            <li>
              <Link target="_blank" to="https://www.coingecko.com/">
                <img
                  className={styles.footerIcon}
                  src={Coingecko}
                  alt="Coingecko Logo"
                />
                <span>Coingecko</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://coinmarketcap.com/">
                <img
                  className={styles.footerIcon}
                  src={Coinmarketcap}
                  alt="Coinmarketcap Logo"
                />
                <span>Coinmarketcap</span>
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://app.reserve.org/ethereum/token/0x0d86883faf4ffd7aeb116390af37746f45b6f378/issuance"
              >
                <img
                  className={styles.footerIcon}
                  src={Reserve}
                  alt="Reserve Logo"
                />
                <span>Reserve</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://opensea.io/">
                <img
                  className={styles.footerIcon}
                  src={Opensea}
                  alt="Opensea Logo"
                />
                <span>Opensea</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://etherscan.io/">
                <img
                  className={styles.footerIcon}
                  src={Etherscan}
                  alt="Etherscan Logo"
                />
                <span>Etherscan</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} M3tering Protocol.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
