import { NavLink } from "react-router";
import { SLX } from "~/assets/token-logos";
import styles from "~/styles/layout.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink to={`/`} className={styles.brandLink}>
        <img src={SLX} alt="Solaxy Logo" className={styles.brandImage} />
        <span className={styles.brandName}>Solaxy</span>
      </NavLink>
      <div></div>
    </nav>
  );
}

export default Navbar;
