import { ReactNode, useEffect, useState } from "react";

import FloatingScrollTop from "../Auxilliary/FloatingScrollToTop";
import Footer from "../Footer";
import Navbar from "../Navbar";


type Layout = {
  children: ReactNode;
};

const Layout = ({ children }: Layout) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkTheme(true);
    }
  }, []);
  
  return (
      <main
        className={`${
          isDarkTheme && "dark"
        } relative scroll-smooth bg-white selection:bg-musto-300 selection:text-black`}
      >
        <Navbar />
        <section className="relative mx-auto">
          {children}
          <aside className="fixed flex flex-col space-y-4 w-fit z-40 bottom-10 right-4 transition-ease h-auto md:right-10">
            <FloatingScrollTop />
          </aside>
        </section>
        <Footer />
      </main>
    );
};

export default Layout;
