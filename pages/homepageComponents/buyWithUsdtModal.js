import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const BuyWithUsdtModal = () => {
  const { address: useAccountAddress, isConnected: useAccountIsConnected } = useAccount();

  // Logging utility
  const Log = (stringToLog) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    console.log(today.toUTCString() + " | " + stringToLog);
  };

  // Presale data class
  class Presale {
    constructor(presaleData) {
      if (presaleData) {
        const presaleSplit = presaleData.toString().split(",");
        let counter = 0;
        this.price = presaleSplit[counter++] / 10 ** 18;
        this.tokensToSell = presaleSplit[counter++];
        this.inSale = presaleSplit[counter++];
        this.tokensSold = this.tokensToSell - this.inSale;
      }
    }
  }

  // State for tokens, USDT, and UI controls
  const [tokens, setTokens] = useState(10000);
  const [usdt, setUsdt] = useState(0);
  const [usdtInputBoxClassName, setUsdtInputBoxClassName] = useState("");
  const [usdtInputBoxError, setUsdtInputBoxError] = useState("");
  const [convertToUsdtButtonClass, setConvertToUsdtButtonClass] = useState("");
  const [convertToUsdtDisabled, setConvertToUsdtDisabled] = useState(false);
  const [convertToUsdtInProcessText, setConvertToUsdtInProcessText] = useState("");

  // Fetch presale data
  const { data: presaleData } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS.toString(),
    abi: process.env.NEXT_PUBLIC_CONTRACT_ABI,
    functionName: "presale",
    args: [process.env.NEXT_PUBLIC_PRESALE_ID],
    watch: true,
  });

  // Fetch USDT contract address
  const { data: usdtContractAddress } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS.toString(),
    abi: process.env.NEXT_PUBLIC_CONTRACT_ABI,
    functionName: "USDTInterface",
    watch: false,
  });

  // Fetch USDT allowance
  const { data: accountAllowance } = useContractRead({
    address: usdtContractAddress,
    abi: process.env.NEXT_PUBLIC_STABLE_COIN_CONTRACT_ABI,
    functionName: "allowance",
    args: [useAccountAddress, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS.toString()],
    watch: true,
  });

  // Fetch USDT balance
  const { data: usdtBalanceOfWalletData } = useContractRead({
    address: usdtContractAddress,
    abi: process.env.NEXT_PUBLIC_STABLE_COIN_CONTRACT_ABI,
    functionName: "balanceOf",
    args: [useAccountAddress],
    watch: true,
  });

  // Prepare USDT allowance transaction
  const { config: usdtAllowanceConfig, write: usdtAllowanceWrite } = usePrepareContractWrite({
    address: usdtContractAddress,
    abi: process.env.NEXT_PUBLIC_STABLE_COIN_CONTRACT_ABI,
    functionName: "approve",
    args: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS.toString(), tokens * 10 ** 6], // USDT has 6 decimals
    enabled: useAccountIsConnected,
  });

  // Execute USDT allowance transaction
  const { isLoading: usdtAllowanceIsLoading, isSuccess: usdtAllowanceIsSuccess } = useWaitForTransaction({
    hash: usdtAllowanceConfig?.hash,
  });

  // Prepare buy with USDT transaction
  const { config: buyWithUsdtConfig, write: buyWithUsdt } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS.toString(),
    abi: process.env.NEXT_PUBLIC_CONTRACT_ABI,
    functionName: "buyWithUSDT",
    args: [process.env.NEXT_PUBLIC_PRESALE_ID, tokens],
    enabled: useAccountIsConnected && (accountAllowance >= tokens * 10 ** 6),
  });

  // Execute buy with USDT transaction
  const { isLoading: isBuyWithUsdtLoading, isSuccess: isBuyWithUsdtSuccess } = useWaitForTransaction({
    hash: buyWithUsdtConfig?.hash,
  });

  // Update USDT value based on tokens
  useEffect(() => {
    if (presaleData) {
      const presale = new Presale(presaleData);
      const usdtValue = tokens * presale.price;
      setUsdt(usdtValue);

      if (usdtValue <= usdtBalanceOfWalletData / 10 ** 6) {
        setUsdtInputBoxClassName("rounded-none rounded-l-lg border bg-gray-300 border-gray-300 text-gray-900 block cursor-not-allowed flex-1 min-w-0 w-full text-sm p-2.5 placeholder-gray-400 focus:ring-red-500");
        setUsdtInputBoxError("");
        setConvertToUsdtButtonClass("bg-red-600 text-white hover:bg-red-700 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150");
        setConvertToUsdtDisabled(false);
      } else {
        setUsdtInputBoxClassName("rounded-none rounded-l-lg border bg-red-50 border-red-500 text-red-900 block cursor-not-allowed flex-1 min-w-0 w-full text-sm p-2.5 placeholder-gray-400 focus:ring-red-500");
        setUsdtInputBoxError(
          <div className="flex">
            <p className="mt-2 text-sm text-red-600"><span className="font-medium">Oh, snap!</span> Insufficient USDT Balance.<br />
              Current balance: <span className="font-medium">{usdtBalanceOfWalletData / 10 ** 6}</span> USDT</p>
          </div>
        );
        setConvertToUsdtButtonClass("cursor-not-allowed bg-gray-300 text-neutral-900 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150");
        setConvertToUsdtDisabled(true);
      }
    }
  }, [tokens, presaleData, usdtBalanceOfWalletData]);

  // Handle transaction loading states
  useEffect(() => {
    if (usdtAllowanceIsLoading || isBuyWithUsdtLoading) {
      setConvertToUsdtDisabled(true);
      setConvertToUsdtButtonClass("cursor-not-allowed bg-gray-300 text-neutral-900 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150");
      setConvertToUsdtInProcessText(
        <div className="flex items-center justify-center mb-5">
          <div role="status">
            <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2 text-sm text-green-200">Please wait, transaction in progress...</p>
        </div>
      );
    } else if (isBuyWithUsdtSuccess) {
      setConvertToUsdtInProcessText(
        <div className="flex items-center justify-center mb-5">
          <p className="mt-2 text-sm text-green-200"><span className="font-medium">Congratulations!</span> Your investment was successful.</p>
        </div>
      );
    } else {
      setConvertToUsdtInProcessText("");
    }
  }, [usdtAllowanceIsLoading, isBuyWithUsdtLoading, isBuyWithUsdtSuccess]);

  // Modal state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="bg-red-600 text-white hover:bg-red-700 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        BUY AIGOS WITH USDT <FontAwesomeIcon icon={faDollar} className="ml-2" />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-neutral-900 rounded-lg shadow-lg w-full max-w-3xl p-6">
            <div className="flex justify-between items-center border-b border-neutral-700 pb-4">
              <h3 className="text-white text-2xl font-semibold uppercase">Exchange</h3>
              <button
                className="text-white hover:text-red-500"
                onClick={() => setShowModal(false)}
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="mt-6">
              <form className="bg-neutral-800 rounded-lg p-6">
                <div className="flex mb-4">
                  <input
                    type="number"
                    value={tokens}
                    onChange={(e) => setTokens(e.target.value)}
                    className="rounded-l-lg bg-gray-700 border border-gray-600 text-white focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                  />
                  <span className="inline-flex items-center px-4 bg-gray-600 text-white rounded-r-lg border border-l-0 border-gray-600">
                    TOKEN
                  </span>
                </div>

                <div className="flex mb-4">
                  <input
                    type="number"
                    value={usdt.toFixed(6)}
                    disabled
                    readOnly
                    className={`rounded-l-lg bg-gray-700 border ${usdtInputBoxClassName.includes("red") ? "border-red-500" : "border-gray-600"} text-white block w-full p-2.5`}
                  />
                  <span className="inline-flex items-center px-4 bg-gray-600 text-white rounded-r-lg border border-l-0 border-gray-600">
                    USDT
                  </span>
                </div>

                {usdtInputBoxError}
              </form>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                className={`${convertToUsdtButtonClass}`}
                disabled={convertToUsdtDisabled}
                onClick={(e) => {
                  e.preventDefault();
                  if (accountAllowance >= tokens * 10 ** 6) {
                    buyWithUsdt?.();
                  } else {
                    usdtAllowanceWrite?.();
                  }
                }}
              >
                {accountAllowance >= tokens * 10 ** 6 ? "BUY WITH USDT" : "APPROVE SPENDING USDT"}
              </button>
            </div>

            {convertToUsdtInProcessText}
          </div>
        </div>
      )}
    </>
  );
};

export default BuyWithUsdtModal;
