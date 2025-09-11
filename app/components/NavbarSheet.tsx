import { NavLink } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

interface NavbarSheetProps {
  children: React.ReactNode;
}

function NavbarSheet({ children }: NavbarSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className={`p-5`}>
        <SheetHeader className={`hidden`}>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <ul className={`space-y-2.5 text-[18px] text-yellow-500 `}>
          <li className={`hover:text-yellow-600`}>
            <NavLink target="_blank" to={`https://m3tering.whynotswitch.com`}>
              Docs
            </NavLink>
          </li>
          <li className={`hover:text-yellow-600`}>
            <NavLink
              target="_blank"
              to={`https://warpcast.com/~/channel/m3ter-heads`}
            >
              Forum
            </NavLink>
          </li>

          <li className={`hover:text-yellow-600`}>
            <NavLink target="_blank" to={`https://github.com/m3tering/Solaxy`}>
              Github
            </NavLink>
          </li>
          <li className={`hover:text-yellow-600`}>
            <NavLink target="_blank" to={`https://etherscan.io/`}>
              Etherscan
            </NavLink>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}

export default NavbarSheet;
