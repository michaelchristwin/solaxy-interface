import { MenuIcon } from "lucide-react";
import { NavLink } from "react-router";
import { SLX } from "~/assets/token-logos";
import styles from "~/styles/layout.module.css";
import NavbarSheet from "./NavbarSheet";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink to={`/`} className={styles.brandLink}>
        <img src={SLX} alt="Solaxy Logo" className={styles.brandImage} />
        <span className={styles.brandName}>Solaxy</span>
      </NavLink>
      <div className={styles.navLinks}>
        <NavLink target="_blank" to={`https://m3tering.whynotswitch.com`}>
          Docs
        </NavLink>
        <NavLink
          target="_blank"
          to={`https://warpcast.com/~/channel/m3ter-heads`}
        >
          Forum
        </NavLink>
        <NavLink target="_blank" to={`https://github.com/m3tering/Solaxy`}>
          Github
        </NavLink>
        <NavLink target="_blank" to={`https://etherscan.io/`}>
          Etherscan
        </NavLink>
      </div>
      <NavbarSheet>
        <button className={styles.sheetButton} type={`button`}>
          <MenuIcon size={26} className={`text-yellow-500`} />
        </button>
      </NavbarSheet>
    </nav>
  );
}

export default Navbar;
