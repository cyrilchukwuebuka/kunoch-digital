import Alert, { Alert as AlertType } from "@/components/Auxilliary/Alert";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

type Props = {
  isClose: boolean;
  onClose: () => void;
};

const InviteModal = ({ isClose, onClose }: Props) => {
  const [alert, setAlert] = useState<AlertType>({
    title: "",
    variant: "warn",
    onClose: () => closeAlert(),
    active: false,
  });

  const closeAlert = () => {
    setAlert({ ...alert, active: false });
  };

  const copyAndShare = () => {
    const copyText = document.getElementById("copy")!;

    navigator.clipboard?.writeText &&
      navigator.clipboard.writeText(copyText.textContent!);

    if (navigator.share !== undefined) {
      navigator
        .share({
          title: "Become one of our first users!",
          text: `We are absolutely thrilled to have you become one of our first users!\n\nWe are a financial technology company that focuses on providing better credit financing options for individuals and businesses in Africa.\n`,
          url: encodeURI(window.document.location.href),
        })
        .then(() => {
          console.log("Thanks for sharing");
        });
    }

    setAlert({
      ...alert,
      variant: "success",
      title: "Link copied",
      active: true,
    });

    setTimeout(() => {
      setAlert({
        ...alert,
        variant: "success",
        title: "Link copied",
        active: false,
      });
    }, 5000);
  };

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
      <section className="relative flex flex-col h-fit w-[90%] sm:w-[70%] md:w-[45%] lg:w-[40%] xl:w-[30%] overflow-hidden space-y-3 py-5 px-4 rounded-lg bg-white dark:bg-gray-800 dark:border dark:border-gray-600">
        <div
          onClick={() => onClose()}
          className="hover:cursor-pointer absolute top-5 right-5"
        >
          <IoIosClose className="w-8 h-8 dark:text-white" />
        </div>

        <div className="flex flex-col w-full space-y-5 items-center py-7">
          <span className="relative w-16 h-16">
            <Image
              src="/assets/images/send_invitation.svg"
              alt="invitation"
              fill
            />
          </span>

          <p className="font-semibold text-lg pb-2 dark:text-gray-200">
            Invite your friends to join us!
          </p>
          <p className="text-center text-ash-900 pb-2 dark:text-gray-400">
            Copy the link below and share with your friends to join our
            waitlist.
          </p>

          <span className="w-full overflow-hidden">
            <section
              className={`flex space-x-2 items-center w-full rounded-l-full rounded-r-full p-2 overflow-hidden bg-ash-200 dark:bg-gray-700 border}`}
            >
              <p
                id="copy"
                className={`flex flex-1 px-2 overflow-hidden w-full rounded-md dark:text-white`}
              >
                {"https://www.kunochdigi.com/"}
              </p>

              <button
                onClick={() => copyAndShare()}
                type="button"
                className={`button-round-orange hidden md:block py-3 px-5`}
              >
                <p className="text-sm">Copy link</p>
              </button>
            </section>

            <button
              onClick={() => copyAndShare()}
              type="button"
              className={`button-round-orange mt-4 md:hidden w-full py-3`}
            >
              <p className="text-sm">Copy link</p>
            </button>
          </span>
        </div>
      </section>
      <span className="z-30 fixed top-3 right-3">
        <Alert alert={alert} />
      </span>
    </div>
  );
};

export default InviteModal;
