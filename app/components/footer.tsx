import { Link } from "react-router";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { SiFarcaster } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";
import styles from "~/styles/layout.module.css";
import { CowSwap, OneInch, UniSwap } from "~/assets/brands";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.linksGroup}>
          <h3 className={styles.groupTitle}>Social</h3>
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
                <FaSquareXTwitter className={styles.footerIcon} />{" "}
                <span>X (formerly Twitter)</span>
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
                Solaxy Github repo
              </Link>
            </li>
            <li>
              <Link target="_blank" to="/privacy">
                Solaxy etherscan ABI link
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
          </ul>
        </div>
        <div className={styles.linksGroup}>
          <h3 className={styles.groupTitle}>Decentralized exchanges</h3>
          <ul className={styles.linksList}>
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
                <span>Jumper exchange</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.linksGroup}>
          <h3 className={styles.groupTitle}>Contract Adresses</h3>
          <ul className={styles.linksList}>
            <li>
              <Link target="_blank" to="https://github.com/M3tering/Solaxy">
                <FaGithub className={styles.footerIcon} />
                <span>SLX contract</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="/privacy">
                <FaGithub className={styles.footerIcon} />
                <span> M3ter contract</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="/cookies">
                <FaGithub className={styles.footerIcon} />
                <span>USD3 contract</span>
              </Link>
            </li>
            <li>
              <Link target="_blank" to="/compliance">
                <FaGithub className={styles.footerIcon} />
                <span>Zap contract</span>
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
