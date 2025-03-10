//import { ModeToggle } from "./mode-toggle";

import { ConnectKitButton } from "connectkit";

function Navbar() {
  return (
    <nav
      className={`w-full h-[60px] flex justify-between items-center fixed top-0 left-0 bg-transparent px-4 py-3`}
    >
      <p></p>
      <ConnectKitButton />
    </nav>
  );
}

export default Navbar;
