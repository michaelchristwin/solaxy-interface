import { Link } from "react-router";
import styles from "~/styles/layout.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.linksGroup}>
          <h3 className={styles.groupTitle}>Social</h3>
          <ul className={styles.linksList}>
            <li>
              <Link target="_blank" to="https://discord.gg/afFvdhW4">
                Discord
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://warpcast.com/~/channel/m3ter-heads"
              >
                Farcaster
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://x.com/M3tering">
                X (formerly Twitter)
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
              <Link target="_blank" to="https://discord.gg/afFvdhW4">
                Uniswap
              </Link>
            </li>
            <li>
              <Link target="_blank" to="https://discord.gg/afFvdhW4">
                Cow swap
              </Link>
            </li>
            <li>
              <Link to="/press">Press</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>
        <div className={styles.linksGroup}>
          <h3 className={styles.groupTitle}>Contract Adresses</h3>
          <ul className={styles.linksList}>
            <li>
              <Link target="_blank" to="https://github.com/M3tering/Solaxy">
                SLX contract
              </Link>
            </li>
            <li>
              <Link target="_blank" to="/privacy">
                M3ter contract
              </Link>
            </li>
            <li>
              <Link target="_blank" to="/cookies">
                USD3 contract
              </Link>
            </li>
            <li>
              <Link target="_blank" to="/compliance">
                Zap contract
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
