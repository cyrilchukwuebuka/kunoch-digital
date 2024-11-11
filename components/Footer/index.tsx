import Link from "next/link";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import Logo from "../Auxilliary/Logo";

const Footer = () => {
  return (
    <div className="bg-mask-900 flex flex-col px-10 py-2">
      <section className="flex flex-col md:flex-row md:justify-between py-8 items-center border-b border-b-shadow-300">
        <div className="flex md:w-1/3">
          <Logo />
        </div>

        <span className="flex my-7 lg:px-5 items-center justify-around space-x-8 md:w-1/3">
          <Link
            className="text-dust-300 text-sm lg:text-base w-fit font-semibold"
            href={""}
          >
            Terms of use
          </Link>

          <Link
            className="text-dust-300 text-sm lg:text-base w-fit font-semibold"
            href={""}
          >
            Privacy Policy
          </Link>
        </span>

        <span className="flex space-x-4 md:space-x-2 items-center md:w-1/3 justify-end">
          <Link
            href="https://twitter.com"
            target="_blank"
            className="p-2 rounded-full bg-white"
          >
            <BsTwitter className="w-5 h-5 hover:cursor-pointer text-shadow-900" />
          </Link>

          <Link
            href="https://www.instagram.com"
            target="_blank"
            className="p-2 rounded-full bg-white"
          >
            <AiFillInstagram className="w-5 h-5 hover:cursor-pointer text-shadow-900" />
          </Link>

          <Link
            href="https://www.linkedin.com"
            className="p-2 rounded-full bg-white"
          >
            <AiFillLinkedin className="w-5 h-5 hover:cursor-pointer text-shadow-900" />
          </Link>
        </span>
      </section>
      <p className="w-fit mx-auto text-sm md:text-base text-dust-900 my-10">
        ©{new Date().getFullYear()} Kunoch Digital
      </p>
    </div>
  );
};

export default Footer;
