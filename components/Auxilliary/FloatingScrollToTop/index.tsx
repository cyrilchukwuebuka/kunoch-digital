import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";

const FloatingScrollTop = () => {
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setShowScrollTopBtn(true);
    } else {
      setShowScrollTopBtn(false);
    }
  };

  const scrollTop = () => {
    window.scroll(0, 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return showScrollTopBtn ? (
    <button
      onClick={scrollTop}
      className="button-outline bg-white rounded-xl transition-ease shadow-md animate-bounce border-2 px-3 lg:px-5 flex items-center py-1 lg:py-2 space-x-2"
    >
      <AiOutlineArrowUp className="w-4 h-4" />
      <p className="text-xs mt-1">BACK TO TOP</p>
    </button>
  ) : (
    <></>
  );
};

export default FloatingScrollTop;
