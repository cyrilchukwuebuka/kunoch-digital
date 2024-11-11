"use client";

import React from "react";

import { AuthProvider } from "@/lib/contexts/auth-context";

const Providers = ({ children }: { children: React.ReactNode }) => {
  // const activeUser = useGlobalStore(state => state.activeUser)

  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
