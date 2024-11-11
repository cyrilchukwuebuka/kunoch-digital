import Layout from "@/components/Layouts";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
