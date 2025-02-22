// pages/homepageComponents/buyWithUsdtModal.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
    useSignMessage
} from "wagmi";
import {  formatUnits } from 'ethers/lib/utils';  //Removed parseUnits
import Cookies from 'js-cookie';

// Import the ABIs directly
import presaleABI from '../../contracts/presaleABI.json';
import StableCoinABI from '../../contracts/StableCoinABI.json';

const BuyWithUsdtModal = () => {
    const { address, isConnected } = useAccount();
    const { signMessage } = useSignMessage();

    // --- State ---
    const [tokens, setTokens] = useState("10000");
    const [usdt, setUsdt] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [usdtInputBoxClassName, setUsdtInputBoxClassName] = useState("");
    const [usdtInputBoxError, setUsdtInputBoxError] = useState();
    const [convertToUsdtButtonClass, setConvertToUsdtButtonClass] = useState("");  // Keep for dynamic styling
    const [convertToUsdtDisabled, setConvertToUsdtDisabled] = useState(false);
    const [convertToUsdtInProcessText, setConvertToUsdtInProcessText] = useState();


     // --- Presale Data, USDT Contract, Allowance, Balance (No Changes) ---
        const {
        data: presaleData,
        isLoading: presaleIsLoading,
        isError: presaleIsError,
        error: presaleError,
        } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: presaleABI,
        functionName: "presale",
        args: [process.env.NEXT_PUBLIC_PRESALE_ID],
        watch: true,
        enabled: Boolean(address),
        });

        const [pricePerToken, setPricePerToken] = useState(0);

        useEffect(() => {
        if (presaleData) {
            const priceInWei = BigInt(presaleData[3]);
            setPricePerToken(Number(formatUnits(priceInWei, 18)));
        }
        }, [presaleData]);

        useEffect(() => {
            if (presaleIsError) {
                console.error("Presale Data Read Error:", presaleError);
            }
        }, [presaleIsError, presaleError]);


        const { data: usdtContractAddress, error: usdtAddressError, isError: usdtAddressIsError } = useContractRead({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            abi: presaleABI,
            functionName: "USDTInterface",
            watch: false,
            enabled: Boolean(address)
        });
        useEffect(() => {
          if (usdtAddressError) {
              console.error("USDT address error:", usdtAddressError)
          }
      }, [usdtAddressError]);

        const {
            data: accountAllowance,
            isLoading: accountAllowanceIsLoading,
            isError: accountAllowanceIsError,
            error: accountAllowanceError
        } = useContractRead({
            address: usdtContractAddress,
            abi: StableCoinABI,
            functionName: "allowance",
            args: [address, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS],
            watch: true,
            enabled: Boolean(address && usdtContractAddress),
        });

        useEffect(() => {
            if (accountAllowanceError) {
                console.error("allowance error: ", accountAllowanceError)
            }
        }, [accountAllowanceError]);

        const {
            data: usdtBalance,
            isLoading: usdtBalanceIsLoading,
            isError: usdtBalanceIsError,
            error: usdtBalanceError
        } = useContractRead({
            address: usdtContractAddress,
            abi: StableCoinABI,
            functionName: "balanceOf",
            args: [address],
            watch: true,
            enabled: Boolean(address && usdtContractAddress),
        });
        useEffect(() => {
            if (usdtBalanceIsError) {
                console.error("USDT Balance Read Error:", usdtBalanceError);
            }
        }, [usdtBalanceIsError, usdtBalanceError]);


        const { data: usdtAllowanceNeeded, error: usdtAllowanceNeededError } = useContractRead({
          address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          abi: presaleABI,
          functionName: "usdtBuyHelper",
          args: [process.env.NEXT_PUBLIC_PRESALE_ID, tokens],
          watch: true,
          enabled: Boolean(address),
          });
        useEffect(() => {
          if (usdtAllowanceNeededError) {
          console.error("usdtAllowanceNeededError error: ", usdtAllowanceNeededError);
          }
        }, [usdtAllowanceNeededError]);



        const { config: approveConfig } = usePrepareContractWrite({
            address: usdtContractAddress,
            abi: StableCoinABI,
            functionName: 'approve',
            args: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, usdtAllowanceNeeded ? usdtAllowanceNeeded : "0"],
            enabled: Boolean(address && usdtContractAddress && usdtAllowanceNeeded && BigInt(accountAllowance?.toString() || 0) < BigInt(usdtAllowanceNeeded?.toString() || 0)),
        });
        const {
            data: approveData,
            isLoading: approveIsLoading,

            isError: approveIsError,
            write: approveWrite,
            error: approveError,
            reset: approveReset
        } = useContractWrite(approveConfig || {});

        const { config: buyWithUsdtConfig } = usePrepareContractWrite({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            abi: presaleABI,
            functionName: 'buyWithUSDT',
            args: [process.env.NEXT_PUBLIC_PRESALE_ID, tokens],
            enabled: Boolean(address && tokens && BigInt(accountAllowance?.toString() || 0) >= BigInt(usdtAllowanceNeeded?.toString() || 0)),
        });

        const {
            data: buyWithUsdtData,
            isLoading: buyWithUsdtIsLoading,
            isSuccess: buyWithUsdtIsSuccess, //remove isSucces
            isError: buyWithUsdtIsError,
            error: buyWithUsdtError,
            write: buyWithUsdtWrite,
            reset: buyWithUsdtReset
        } = useContractWrite(buyWithUsdtConfig || {});



        const { isLoading: approveWaitLoading, isSuccess: approveWaitSuccess,  } = useWaitForTransaction({ //removed error
            hash: approveData?.hash,
        });

        const { isLoading: buyWaitLoading, isSuccess: buyWaitSuccess,  } = useWaitForTransaction({   //removed error
            hash: buyWithUsdtData?.hash,
        });

        useEffect(() => {
            if (approveWaitSuccess) {
                approveReset();
            }
        }, [approveWaitSuccess, approveReset])

        useEffect(() => {
            if (buyWaitSuccess) {
                buyWithUsdtReset();
                setTokens('');

                const sendPurchaseInfo = async () => {
                    try {
                        const storedRefLink = Cookies.get('refCode');
                        const response = await fetch('/api/purchase', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                buyerWallet: address,
                                usdtAmount: usdt,
                                refCode: storedRefLink,
                            }),
                        });
                        if (!response.ok) {
                            const errorData = await response.json();
                            console.error("Purchase recording error:", errorData);
                        }

                    } catch (error) {
                        console.error("Error sending purchase info:", error);
                    }
                }
                sendPurchaseInfo();
            }
        }, [buyWaitSuccess, buyWithUsdtReset, address, usdt]);

    useEffect(() => {
        if (!pricePerToken || !tokens) {
            setUsdt(0);
            return;
        }
    }, [pricePerToken, tokens]);

    useEffect(() => {
      try {
        const usdtValue = parseFloat(tokens) * pricePerToken;
        setUsdt(usdtValue);
  
        if (usdtBalance && usdtValue <= Number(formatUnits(usdtBalance, 6))) {
          setUsdtInputBoxClassName("border bg-gray-100 border-gray-300 text-gray-900 block cursor-not-allowed flex-1 min-w-0 w-full text-sm p-2 placeholder-gray-400 focus:ring-2 focus:ring-purple-500");
          setUsdtInputBoxError("");
          setConvertToUsdtButtonClass("bg-red-500 text-white hover:bg-red-600 active:bg-red-700 font-bold uppercase text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none transition-all duration-150");
          setConvertToUsdtDisabled(false);
        } else {
          setUsdtInputBoxClassName("border bg-red-50 border-red-500 text-red-900 block cursor-not-allowed flex-1 min-w-0 w-full text-sm p-2 placeholder-gray-400 focus:ring-2 focus:ring-purple-500");
          setUsdtInputBoxError(
            <div className="flex">
              <p className="mt-1 text-sm text-red-600"><span className="font-medium">Oh, snapp!</span> Insufficient USDT Balance.<br />
                Current balance: <span className="font-medium">{usdtBalance ? formatUnits(usdtBalance, 6) : '0'}</span> USDT</p>
            </div>
          );
          setConvertToUsdtButtonClass("cursor-not-allowed bg-gray-300 text-gray-600 font-bold uppercase text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none transition-all duration-150");
          setConvertToUsdtDisabled(true);
        }
      } catch (error) {
        console.error("Error calculating USDT value:", error);
        setUsdt(0);
      }
    }, [tokens, pricePerToken, usdtBalance, setUsdt]);
  
    useEffect(() => {
      const anyLoading = approveIsLoading || buyWithUsdtIsLoading || approveWaitLoading || buyWaitLoading;
  
      setConvertToUsdtDisabled(anyLoading);
  
      const buttonClass = anyLoading
        ? "cursor-not-allowed bg-gray-300 text-gray-600 font-bold uppercase text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none transition-all duration-150"
        : BigInt(accountAllowance || 0) >= BigInt(usdtAllowanceNeeded || 0)
          ? "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 font-bold uppercase text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none transition-all duration-150"
          : "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 font-bold uppercase text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none transition-all duration-150";
      setConvertToUsdtButtonClass(buttonClass);
  
      if (approveIsLoading || approveWaitLoading) {
        setConvertToUsdtInProcessText(
          <div className="flex items-center justify-center py-1">
            <div role="status">
              <svg className="inline mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-black-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            <p className="text-sm text-black-500">Granting allowance of <span className="font-medium">USDT</span>...</p>
          </div>
        );
      } else if (buyWithUsdtIsLoading || buyWaitLoading) {
        setConvertToUsdtInProcessText(
          <>
            <div className="flex items-center justify-center">
              <div role="status">
                <svg className="inline mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-black-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              <p className="text-sm text-black-500"><span className="font-medium">Investment</span> in progress...</p>
            </div>
          </>
        );
      } else if (buyWaitSuccess) {
        setConvertToUsdtInProcessText(
          <>
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-black-500 text-xl mr-2" />
              <p className="text-sm text-black-500"><span className="font-medium">Congratulations!</span> Investment successful!</p>
            </div>
          </>
        );
      } else {
        setConvertToUsdtInProcessText(undefined);
      }
  
    }, [approveIsLoading, buyWithUsdtIsLoading, approveWaitLoading, buyWaitLoading, accountAllowance, usdtAllowanceNeeded, approveWaitSuccess, buyWaitSuccess, approveReset, buyWithUsdtReset]);
  
    return (
      <>
        {/* Modal Trigger Button */}
        <button
          className="bg-red-500 text-white hover:bg-red-600 active:bg-red-700 font-bold uppercase text-sm px-4 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          BUY AGS
        </button>
  
        {/* Modal */}
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full max-w-lg my-1 mx-auto">
                {/* Ultra-Compact Modal Content */}
                <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-gradient-to-r from-red-500 to-purple-600 bg-opacity-90 backdrop-blur-md outline-none focus:outline-none">
                  {/* Minimal Header */}
                  <div className="flex items-center justify-between p-1 border-sm border-solid border-white/20 rounded-t">
                    <button
                      className="ml-auto bg-transparent border-0 text-white text-xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                  
                  {/* Ultra-Compact Body */}
                  <div className="relative p-2 flex-auto">
                    <form className="bg-white/70 backdrop-blur-md rounded-2xl px-3 py-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (BigInt(accountAllowance?.toString() || 0) >= BigInt(usdtAllowanceNeeded?.toString() || 0)) {
                          buyWithUsdtWrite?.();
                        } else {
                          approveWrite?.();
                        }
                      }}>
                      
                      {/* AGS Input - Fixed height with label */}
                      <div className="mb-0">
                        <div className="flex h-10">
                          <input
                            type="text"
                            id="tokens"
                            placeholder="Enter AGS amount"
                            className="h-full rounded-l-lg border border-gray-300 text-gray-700 block flex-1 min-w-0 w-full text-sm px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={tokens}
                            onChange={(e) => setTokens(e.target.value)}
                          />
                          <span className="inline-flex items-center justify-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-lg border border-l-0 border-gray-300 h-full">
                            <div className="flex items-center">
                              <img src="/logo1.png" alt="AIGOS LOGO" className="w-7 h-7 mr-1" />
                              <span>AGS</span>
                            </div>
                          </span>
                        </div>
                      </div>
                      
                      {/* USDT Input - Fixed height & Touching AGS input */}
                      <div className="mb-1">
                        <div className="flex h-10 mt-0">
                          <input
                            type="number"
                            id="usdt"
                            value={usdt.toFixed(6)}
                            disabled
                            readOnly
                            className={`h-full ${usdtInputBoxClassName.replace("rounded-lg", "rounded-l-lg")}`}
                          />
                          <span className="inline-flex items-center justify-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-lg border border-l-0 border-gray-300 h-full">
                            <div className="flex items-center">
                              <img src="/usdt.png" alt="USDT LOGO" className="w-5 h-5 mr-1" />
                              <span>USDT</span>
                            </div>
                          </span>
                        </div>
                        {usdtInputBoxError && <div className="text-xs">{usdtInputBoxError}</div>}
                      </div>
                    </form>
                  </div>
                  
                  {/* Minimal Footer */}
                  <div className="flex items-center justify-center p-2 border-t border-solid border-white/20 rounded-b">
                    <button
                      className={convertToUsdtButtonClass}
                      type="button"
                      disabled={convertToUsdtDisabled}
                      onClick={(e) => {
                        e.preventDefault();
                        if (BigInt(accountAllowance?.toString() || 0) >= BigInt(usdtAllowanceNeeded?.toString() || 0)) {
                          buyWithUsdtWrite?.();
                        } else {
                          approveWrite?.();
                        }
                      }}
                    >
                      {(approveIsLoading || approveWaitLoading) ? 'Approving USDT...'
                        : (buyWithUsdtIsLoading || buyWaitLoading) ? 'Buying Tokens...'
                          : (BigInt(accountAllowance?.toString() || 0) >= BigInt(usdtAllowanceNeeded?.toString() || 0)) ? 'Buy Tokens' : 'Approve USDT'}
                    </button>
                  </div>
                  
                  {/* Compact Status Messages */}
                  {(approveIsError || buyWithUsdtIsError || convertToUsdtInProcessText) && (
                    <div className="px-2 py-1 text-sm">
                      {approveIsError && (
                        <div className="text-red-500 text-xs"><b>Error:</b> {approveError?.message}</div>
                      )}
                      {buyWithUsdtIsError && (
                        <div className="text-red-500 text-xs"><b>Error:</b> {buyWithUsdtError?.message}</div>
                      )}
                      {convertToUsdtInProcessText && (
                        <div className="text-black-500">
                          {convertToUsdtInProcessText}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  };
  
  export default BuyWithUsdtModal;