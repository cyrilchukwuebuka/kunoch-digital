import { HOME_ROUTE } from "@/utils/config/urls";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={HOME_ROUTE} className="relative w-36 h-20 outline-none">
      <Image
        src="/assets/images/logo.svg"
        alt="Mustard credit"
        style={{
          objectFit: "contain",
          objectPosition: "center",
        }}
        fill
      />
    </Link>
  );
};

export default Logo;
