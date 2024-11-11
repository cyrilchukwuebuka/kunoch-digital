import Alert, { Alert as AlertType } from "@/components/Auxilliary/Alert";
import Spinner from "@/components/Auxilliary/Spinner";
import { Form, Input } from "@/components/Form";
import Invite from "@/components/Modal/InviteModal";
import Success from "@/components/Modal/SuccessModal";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import * as yup from "yup";

enum FieldsName {
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  EMAIL = "email",
}

interface InputFields {
  firstname: string;
  lastname: string;
  email: string;
}

const ValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .matches(/@[^.]*\./)
    .required("Please enter your email"),
  lastname: yup.string().required("Please enter your last name"),
  firstname: yup.string().required("Please enter your first name"),
});

const Home = () => {
  const [closeSuccessModal, setCloseSuccessModal] = useState(true);
  const [closeInviteModal, setCloseInviteModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    title: "",
    variant: "warn",
    onClose: () => closeAlert(),
    active: false,
  });

  const defaultValues = useMemo(() => {
    return {
      [FieldsName.FIRSTNAME]: "",
      [FieldsName.LASTNAME]: "",
      [FieldsName.EMAIL]: "",
    };
  }, []);

  const closeAlert = () => {
    setAlert({ ...alert, active: false });
  };

  const handleClose = () => {
    setCloseSuccessModal(true);
    setCloseInviteModal(true);
  };

  const onSubmit = async (_data: InputFields, reset: () => void) => {
    setLoading(true);
    reset();
    setAlert({
      ...alert,
      title: "Subscribed successfully...",
      variant: "success",
      onClose: () => setAlert(alert),
      active: false,
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (alert.variant === "success") {
      setCloseSuccessModal(false);
    }
  }, [alert]);

  return (
    <div className="overflow-hidden">
      <Head>
        <title className="uppercase">PRELAUNCH - KUNOCH DIGITAL</title>
      </Head>

      <main className="dark:bg-black dark:text-gray-200 py-10">
        <section className="flex flex-col min-h-[60vh] md:min-h-[70vh]">
          <div className="flex flex-col flex-1 justify-center items-center sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto dark:bg-black">
            <p className="font-semibold text-3xl dark:text-white">
              Join the waitlist
            </p>
            <p className="text-center w-[85%] sm:w-[70%] pt-4 pb-8 dark:text-gray-300">
              We are absolutely thrilled to have you become one of our first
              users!
            </p>

            <Form
              onSubmit={(data, reset) =>
                onSubmit(data as InputFields, reset)
              }
              defaultValues={defaultValues}
              actionButtons={(isLoading: boolean) => (
                <div className="pt-5">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex space-x-3 items-center justify-center button-round-orange rounded-md ${
                      loading ? "py-4 px-10" : "py-3 px-5"
                    }`}
                  >
                    <p>Submit</p> {loading && <Spinner color="white" />}
                  </button>
                </div>
              )}
              schema={ValidationSchema}
              className="w-full"
            >
              <div className="flex flex-col space-y-6 pt-2">
                <Input
                  name={FieldsName.FIRSTNAME}
                  placeholder="Enter your first name"
                  id={FieldsName.FIRSTNAME}
                  className="input-outline-none bg-ash-200 p-4 placeholder:text-base text-base h-full w-full dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-400"
                />
                <Input
                  name={FieldsName.LASTNAME}
                  placeholder="Enter your last name"
                  id={FieldsName.LASTNAME}
                  className="input-outline-none bg-ash-200 p-4 placeholder:text-base text-base h-full w-full dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-400"
                />
                <Input
                  name={FieldsName.EMAIL}
                  type={"email"}
                  placeholder="Enter your email"
                  id={FieldsName.EMAIL}
                  className="input-outline-none bg-ash-200 p-4 placeholder:text-base text-base h-full w-full dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-400"
                />
              </div>
            </Form>
          </div>
        </section>

        <section className="h-96 dark:h-72 md:h-fit relative flex flex-col dark:bg-black pt-10">
          <div className="z-10 flex flex-col flex-1 items-center w-full px-5 md:px-10 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] mx-auto">
            <p className="w-[85%] md:w-96 text-center mx-auto mt-14 md:mt-20 mb-5 dark:text-gray-200 dark:mt-0">
              Refer your friends to join the waitlist, and get better discount
              on our academic products.
            </p>
            <span
              onClick={() => setCloseInviteModal(!closeInviteModal)}
              className="mb-20 py-2 pl-6 pr-4 text-musto-800 rounded-r-full rounded-l-full border md:border-none border-musto-800 flex items-center space-x-2 hover:cursor-pointer hover:scale-105"
            >
              <p className="text-base font-semibold">Invite friends</p>
              <FiArrowUpRight className="w-4 h-4" />
            </span>
          </div>

          <span className="absolute top-0 w-full h-1 md:h-1">
            <Image
              src="/assets/images/line_divider.svg"
              alt="line divider"
              style={{
                objectFit: "fill",
                objectPosition: "center",
              }}
              fill
            />
          </span>

          <div className="flex absolute top-0 bottom-0 left-0 right-0 w-full justify-between items-end md:items-start gap-12">
            <span className="relative md:-m-14 w-56 md:w-96 h-56 md:h-80">
              <Image
                src="/assets/images/color_leaf.svg"
                alt="color leaf"
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                }}
                fill
              />
            </span>

            <span className="relative md:-m-14 w-56 md:w-96 h-56 md:h-80">
              <Image
                src="/assets/images/color_leaf_2.svg"
                alt="color leaf"
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                }}
                fill
              />
            </span>
          </div>
        </section>

        <section className="flex flex-col space-y-8 bg-ash-100 dark:bg-gray-900 h-[80vh] justify-center items-center">
          <p className="rounded-l-full w-fit rounded-r-full bg-ash-200 text-ash-900 font-semibold text-sm px-3 py-1 dark:text-white dark:bg-gray-800">
            ABOUT US
          </p>

          <p className="w-[80%] md:w-[65%] font-semibold text-xl dark:text-white text-center">
            KunochDigi is a dynamic and innovative learning center, providing a
            diverse range of educational and training courses empowering
            individuals of all ages in Africa.
          </p>
        </section>

        <Success isClose={closeSuccessModal} onClose={handleClose} />
        <Invite isClose={closeInviteModal} onClose={handleClose} />

        <span className="z-30 fixed top-3 right-3">
          <Alert alert={alert} />
        </span>
      </main>
    </div>
  );
};

export default Home;
