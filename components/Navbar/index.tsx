import { DASHBOARD_ROUTE } from "@/utils/config/urls";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Auxilliary/Logo";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="z-30 md:sticky md:top-0 w-full min-h-[2.5rem] dark:bg-gray-900 px-6 md:px-10 flex items-center justify-between bg-white border-b shadow dark:border-b-gray-800">
        <section className="relative flex items-center">
          <Logo />
        </section>

        {pathname !== DASHBOARD_ROUTE && (
          <Link
            href={DASHBOARD_ROUTE}
            className="button-round px-3 lg:px-5 flex items-center py-2 lg:py-3 space-x-2 dark:bg-gray-600 dark:text-white"
          >
            <p className="text-xs">Dashboard</p>
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
