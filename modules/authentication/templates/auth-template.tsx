"use client";

import React from "react";


import Login from "../components/Login";
import Register from "../components/Register";
import { useAuthContext } from "@/lib/contexts/auth-context";

const AuthTemplate = () => {
  const { authView } = useAuthContext();

  return (
    <div className="mx-auto h-fit min-h-screen w-full md:w-96">
      <div className={`flex h-fit min-h-[calc(100vh-120px)] w-full flex-col`}>
        <section className="relative w-full bg-white px-10 py-5 text-center text-2xl font-bold text-black md:hidden">
          {/* {authView[0] === AUTH_VIEW.REGISTER
            ? "Let’s get started"
            : authView[0] === AUTH_VIEW.LOGIN
            ? "Welcome Back"
            : "Welcome to Ije"} */}
        </section>

        <section className="relative flex h-fit w-full flex-col overflow-hidden px-3">
          <section
            // className={`h-fit w-full overflow-auto ${
            //   authView[0] === AUTH_VIEW.FORGOT_PASSWORD && "hidden"
            // }`}
          >
            <div
              className={`flex h-fit w-full justify-center space-x-14 border-b-2 border-shade-light/40 pt-3 text-base font-medium sm:text-lg`}
            >
              <button
                // onClick={() => authView[1](AUTH_VIEW.REGISTER)}
                // className={`${
                //   authView[0] !== AUTH_VIEW.LOGIN && "border-b-[3px] font-bold"
                // } py-1 hover:cursor-pointer`}
              >
                Sign up
              </button>
              <button
                // onClick={() => authView[1](AUTH_VIEW.LOGIN)}
                // className={`${
                //   authView[0] === AUTH_VIEW.LOGIN && "border-b-[3px] font-bold"
                // } py-1 hover:cursor-pointer`}
              >
                Log in
              </button>
            </div>

            <div className={`mx-auto block h-fit w-full pb-16 pt-8`}>
              {/* {authView[0] !== AUTH_VIEW.LOGIN ? <Register /> : <Login />} */}
            </div>
          </section>
        </section>
      </div>

      {/* <EmailVerification close={closeModal} /> */}
    </div>
  );
};

export default AuthTemplate;
