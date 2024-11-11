import Image from "next/image";
import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";

type Props = {
  isClose: boolean;
  onClose: () => void;
};

const Success = ({ isClose, onClose }: Props) => {
  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => e.key === "Escape" && onClose()
    );

    return () => {
      document.removeEventListener("keydown", (e) => e.key === "Escape");
    };
  }, []);

  return (
    <div
      className={`z-50 flex ${
        isClose ? " md:flex -translate-y-full" : "md:flex"
      } justify-center items-center overflow-auto fixed top-0 bottom-0 transition-ease bg-black/60 w-full`}
    >
      <section className="relative flex flex-col h-fit w-[80%] sm:w-[70%] md:w-[45%] lg:w-[40%] xl:w-[30%] overflow-hidden space-y-3 py-5 px-4 rounded-lg bg-white dark:bg-gray-800 dark:border dark:border-gray-600">
        <div
          onClick={() => onClose()}
          className="hover:cursor-pointer absolute top-5 right-5"
        >
          <IoIosClose className="w-8 h-8 dark:text-white" />
        </div>

        <div className="flex flex-col space-y-5 items-center py-7 dark:text-white">
          <span className="relative w-20 h-20">
            <Image src="/assets/images/success_check.svg" alt="success" fill />
          </span>

          <p className="font-semibold text-xl pb-2">Congratulations!</p>
          <p className="text-center text-ash-900 dark:text-ash-300 pb-2">
            You have been added to the waitlist successfully.
          </p>

          <button
            onClick={() => onClose()}
            type="submit"
            className={`button-round-orange w-[90%] py-3 px-5`}
          >
            Back to home
          </button>
        </div>
      </section>
    </div>
  );
};

export default Success;
