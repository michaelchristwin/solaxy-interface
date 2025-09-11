import { MenuIcon } from "lucide-react";
import { NavLink, Link } from "react-router";
import { SLX } from "~/assets/token-logos";
import NavbarSheet from "./NavbarSheet";

function Navbar() {
  return (
    <header className="flex justify-between items-center h-[60px] px-[50px] md:px-[100px] lg:px-[120px] bg-white/10 bg-clip-padding backdrop-filter backdrop-blur-lg">
      <Link to={`/`} className="flex justify-center items-center">
        <img src={SLX} alt="Solaxy Logo" className="h-[26px] w-[26px]" />
        <span className="font-semibold text-[#eab308] text-[23px]">Solaxy</span>
      </Link>
      <nav className="lg:flex hidden items-center gap-[30px]">
        <NavLink
          target="_blank"
          to={`https://m3tering.whynotswitch.com`}
          className="text-[#eab308] font-semibold ease-in duration-300 transition hover:text-[#c47d00]"
        >
          Docs
        </NavLink>
        <NavLink
          target="_blank"
          to={`https://warpcast.com/~/channel/m3ter-heads`}
          className="text-[#eab308] font-semibold ease-in duration-300 transition hover:text-[#c47d00]"
        >
          Forum
        </NavLink>
        <NavLink
          target="_blank"
          to={`https://github.com/m3tering/Solaxy`}
          className="text-[#eab308] font-semibold ease-in duration-300 transition hover:text-[#c47d00]"
        >
          Github
        </NavLink>
        <NavLink
          target="_blank"
          to={`https://etherscan.io/`}
          className="text-[#eab308] font-semibold ease-in duration-300 transition hover:text-[#c47d00]"
        >
          Etherscan
        </NavLink>

        <NavbarSheet>
          <button
            className="rounded-full flex lg:hidden w-[26px] h-[26px]"
            type={`button`}
          >
            <MenuIcon size={26} className={`text-yellow-500`} />
          </button>
        </NavbarSheet>
      </nav>
    </header>
  );
}

export default Navbar;
