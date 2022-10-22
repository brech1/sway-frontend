import Head from "next/head";
import ContractForm from "../app/ContractForm";
import type { NextPage } from "next";
import { PROJECT_NAME } from "../app/config";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sway Frontend Template</title>
        <meta name="description" content="My Fuel DApp" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <div className="flex font-sans text-white antialiased gradient bg-gradient-to-t from-emerald-700 to-black leading-relaxed tracking-wide">
        <div className="flex flex-grow flex-col max-w-7xl min-h-screen m-auto ">
          <div className="flex items-center p-6">
            <div className="flex justify-start">
              <a href="#">
                <span className="sr-only">Sway</span>
                <img src="./logo.svg" alt="logo" className="h-10 w-auto" />
              </a>
            </div>
            <div className="pl-4">
              <p>{PROJECT_NAME}</p>
            </div>
            <div className="flex items-center justify-end ml-auto">
              <a
                href={`https://fuellabs.github.io/block-explorer-v2/address/${process.env.NEXT_PUBLIC_WALLET_ADDRESS}`}
                target="_blank"
              >
                <button className="font-bold font-sm inline-flex w-28 justify-center mx-auto py-2 px-6 border border-transparent shadow-sm font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                  Explorer
                </button>
              </a>
            </div>
          </div>
          <div className="container mx-auto mb-auto">
            <div className="px-3 lg:px-0">
              <h1 className="my-4 text-2xl md:text-3xl lg:text-5xl font-black leading-tight text-center">
                Welcome to your new Fuel DApp!
              </h1>
              <p className="leading-normal text-gray-100 text-base md:text-xl lg:text-2xl mb-8 text-center">
                Interact with your sway contract
              </p>
              <div className="flex w-full flex-col items-center justify-center">
                <ContractForm />
              </div>
            </div>
          </div>
          <footer>
            <div className="flex w-full mx-auto content-end">
              <div className="p-2 ml-auto text-2xl">⚡</div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
