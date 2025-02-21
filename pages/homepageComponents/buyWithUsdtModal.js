
// pages/homepageComponents/buyWithUsdtModal.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
    useSignMessage // Keep this import, as it's used for the purchase signature
} from "wagmi";
import { parseUnits, formatUnits } from 'ethers/lib/utils';
import Cookies from 'js-cookie';
//  Remove, since the authentication is handled elsewhere.
// import { useAuth } from '../../contexts/AuthContext';

// Import the ABIs directly
import presaleABI from '../../contracts/presaleABI.json';
import StableCoinABI from '../../contracts/StableCoinABI.json';

const BuyWithUsdtModal = () => {
    const { address, isConnected } = useAccount();
    // const { login } = useAuth(); // No longer needed here
    const { signMessage, data: signature, isLoading: isSigning, error: signError } = useSignMessage();

    // --- State ---
    const [tokens, setTokens] = useState("10000"); // Initialize as string
    const [usdt, setUsdt] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [usdtInputBoxClassName, setUsdtInputBoxClassName] = useState("");
    const [usdtInputBoxError, setUsdtInputBoxError] = useState(); // Allow React nodes
    const [convertToUsdtButtonClass, setConvertToUsdtButtonClass] = useState("");
    const [convertToUsdtDisabled, setConvertToUsdtDisabled] = useState(false);
    const [convertToUsdtInProcessText, setConvertToUsdtInProcessText] = useState();


     // --- Presale Data, USDT Contract, Allowance, Balance - No Changes here ---
        const {
        data: presaleData,
        isLoading: presaleIsLoading,
        isError: presaleIsError,
        error: presaleError,
        } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: presaleABI, // Use imported ABI
        functionName: "presale",
        args: [process.env.NEXT_PUBLIC_PRESALE_ID],
        watch: true,
        enabled: Boolean(address),
        });

        // Store the price as a Number for calculations, like the original
        const [pricePerToken, setPricePerToken] = useState(0);

        useEffect(() => {
        if (presaleData) {
        // presaleData[3] is expected to be in wei.  Divide to get the price per token.
        const priceInWei = BigInt(presaleData[3]);
        setPricePerToken(Number(formatUnits(priceInWei, 18))); // Convert to Number, like original
        }
        }, [presaleData]);

        // --- Error handling for presaleData (Keep this) ---
        useEffect(() => {
        if (presaleIsError) {
        console.error("Presale Data Read Error:", presaleError);
        }
        }, [presaleIsError, presaleError]);

        // --- USDT Contract Address ---
        const { data: usdtContractAddress, error: usdtAddressError, isError: usdtAddressIsError } = useContractRead({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            abi: presaleABI, // Use imported ABI.  Same ABI as presale, since it's a function *on* the presale contract.
            functionName: "USDTInterface",
            watch: false, // No need to watch the contract address itself
            enabled: Boolean(address) // Only fetch if connected
        });
        useEffect(() => {
            if (usdtAddressError) {
                console.error("USDT address error:", usdtAddressError)
            }
        }, [usdtAddressError]);


        // --- USDT Allowance ---
        const {
            data: accountAllowance,
            isLoading: accountAllowanceIsLoading,
            isError: accountAllowanceIsError,
            error: accountAllowanceError
        } = useContractRead({
            address: usdtContractAddress,  // Correct address: the USDT contract
            abi: StableCoinABI, // Use imported ABI
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

        // --- USDT Balance ---
        const {
        data: usdtBalance,
        isLoading: usdtBalanceIsLoading, // Add loading state
        isError: usdtBalanceIsError,
        error: usdtBalanceError
        } = useContractRead({
            address: usdtContractAddress,  // Correct address: the USDT contract.
            abi: StableCoinABI,  // Use the imported USDT ABI
            functionName: "balanceOf",
            args: [address],
            watch: true,
            enabled: Boolean(address && usdtContractAddress), // Only run when connected and address available
        });

        useEffect(() => {
            if (usdtBalanceIsError) {
                console.error("USDT Balance Read Error:", usdtBalanceError);
            }
        }, [usdtBalanceIsError, usdtBalanceError]);

        // --- USDT Buy Helper (for required allowance) ---
        const { data: usdtAllowanceNeeded, error: usdtAllowanceNeededError } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: presaleABI,
        functionName: "usdtBuyHelper",
        args: [process.env.NEXT_PUBLIC_PRESALE_ID, tokens], // Remove parseUnits
        watch: true,
        enabled: Boolean(address),
        });
        useEffect(() => {
        if (usdtAllowanceNeededError) {
        console.error("usdtAllowanceNeededError error: ", usdtAllowanceNeededError);
        }
        }, [usdtAllowanceNeededError]);

        // --- Approve USDT ---
        const { config: approveConfig } = usePrepareContractWrite({
            address: usdtContractAddress, // Correct address: the USDT contract
            abi: StableCoinABI,  // Use the imported USDT ABI
            functionName: 'approve',
            args: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, usdtAllowanceNeeded ? usdtAllowanceNeeded : "0"], // Convert to BigInt
            enabled: Boolean(address && usdtContractAddress && usdtAllowanceNeeded && BigInt(accountAllowance?.toString() || 0) < BigInt(usdtAllowanceNeeded?.toString() || 0)),
        });
        const {
            data: approveData,
            isLoading: approveIsLoading,
            isSuccess: approveIsSuccess,
            isError: approveIsError,
            write: approveWrite,
            error: approveError,
            reset: approveReset // Add reset function
        } = useContractWrite(approveConfig || {}); // Add || {} for safety


        // --- Buy With USDT (Prepared) ---
        const { config: buyWithUsdtConfig } = usePrepareContractWrite({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            abi: presaleABI,
            functionName: 'buyWithUSDT',
            args: [process.env.NEXT_PUBLIC_PRESALE_ID, tokens], // Remove parseUnits
            enabled: Boolean(address && tokens && BigInt(accountAllowance?.toString() || 0) >= BigInt(usdtAllowanceNeeded?.toString() || 0)), // Still need BigInt comparison
        });

        const {
            data: buyWithUsdtData,
            isLoading: buyWithUsdtIsLoading,
            isSuccess: buyWithUsdtIsSuccess,
            isError: buyWithUsdtIsError,
            error: buyWithUsdtError,
            write: buyWithUsdtWrite,
            reset: buyWithUsdtReset // Add reset
        } = useContractWrite(buyWithUsdtConfig || {}); // Add || {} for safety.

        // --- Wait for Transactions ---
        const { isLoading: approveWaitLoading, isSuccess: approveWaitSuccess, error: approveWaitError } = useWaitForTransaction({
            hash: approveData?.hash,
        });

        const { isLoading: buyWaitLoading, isSuccess: buyWaitSuccess, error: buyWaitError } = useWaitForTransaction({
            hash: buyWithUsdtData?.hash,
        });

    // --- Effects ---
    // Reset on success and error
    useEffect(() => {
        if (approveWaitSuccess) {
            approveReset(); // Clear approval data
        }
    },[approveWaitSuccess, approveReset])

    // --- NO AUTHENTICATION useEffect HERE ---

    useEffect(() => {
      if (buyWaitSuccess) {
          buyWithUsdtReset();
          setTokens('');

          const sendPurchaseInfo = async () => {
              try {
                  const storedRefLink = Cookies.get('refCode'); // Get full link
                    const response = await fetch('/api/purchase', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            buyerWallet: address,
                            usdtAmount: usdt,  // Use local usdt
                            refCode: storedRefLink, // Use full link
                        }),
                    });
                    if (!response.ok) {
                      const errorData = await response.json();
                      console.error("Purchase recording error:", errorData);
                    }

              } catch (error) {
                  console.error("Error sending purchase info:", error);
              }
          };
          sendPurchaseInfo();
      }
  }, [buyWaitSuccess, buyWithUsdtReset, address, usdt]); // Removed signMessage

  useEffect(() => {
      if (!pricePerToken || !tokens) { // Use the stored pricePerToken
          setUsdt(0);
          return;
      }

      try {
          // pricePerToken is now a Number in the base unit (USDT)
          const usdtValue = parseFloat(tokens) * pricePerToken; // Multiply directly, like original
          setUsdt(usdtValue);

          // Check if the user has enough USDT.  usdtBalance is already in USDT units.
          if (usdtBalance && usdtValue <= Number(formatUnits(usdtBalance, 6))) {
              setUsdtInputBoxClassName("rounded-none rounded-l-lg border bg-gray-300 border border-gray-300 text-gray-900 block cursor-not-allowed flex-1 min-w-0 w-full text-sm p-2.5 placeholder-gray-400 focus:ring-red-500");
              setUsdtInputBoxError("");
              setConvertToUsdtButtonClass("bg-red-600 text-white hover:text-white hover:bg-slate-300 active:bg-red-900 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150");
              setConvertToUsdtDisabled(false);
          } else {
              setUsdtInputBoxClassName("rounded-none rounded-l-lg border bg-red-50 border border-red-500 text-red-900 block cursor-not-allowed flex-1 min-w-0 w-full text-sm p-2.5 placeholder-gray-400 focus:ring-red-500");
              setUsdtInputBoxError(
                  <>
                      <div className="flex">
                          <p className="mt-2 text-sm text-red-600"><span className="font-medium">Oh, snapp!</span> Insufficient USDT Balance.<br />
                              Current balance: <span className="font-medium">{usdtBalance ? formatUnits(usdtBalance, 6) : '0'}</span> USDT</p>
                      </div>
                  </>
              );
              setConvertToUsdtButtonClass("cursor-not-allowed bg-gray-300 text-neutral-900 text-white font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150");
              setConvertToUsdtDisabled(true);

          }
      } catch (error) {
          console.error("Error calculating USDT value:", error);
          setUsdt(0); // Reset USDT on error
      }
  }, [tokens, pricePerToken, usdtBalance]);

   useEffect(() => {
      // Disable button if any transaction is loading, enable if all complete and allowance is sufficient.
      const anyLoading = approveIsLoading || buyWithUsdtIsLoading || approveWaitLoading || buyWaitLoading;

      setConvertToUsdtDisabled(anyLoading);

      // Set button class based on loading state
      const buttonClass = anyLoading
          ? "cursor-not-allowed bg-gray-300 text-neutral-900 text-white font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          : BigInt(accountAllowance || 0) >= BigInt(usdtAllowanceNeeded || 0)
              ? "bg-red-600 text-white hover:text-white hover:bg-slate-300 active:bg-red-900 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              : "bg-red-600 text-white hover:text-white hover:bg-slate-300 active:bg-red-900 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150";
      setConvertToUsdtButtonClass(buttonClass);



      if (approveIsLoading || approveWaitLoading) {
          setConvertToUsdtInProcessText(
              <>
                  <div className="flex items-center justify-center mb-5">
                      <div role="status">
                          <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                          </svg>
                          <span className="sr-only">Loading...</span>
                      </div>
                      <p className="mt-2 text-sm text-green-200"> Please wait, granting allowance of <span className="font-medium">USDT</span>...</p>
                  </div>
              </>
          );
      } else if (buyWithUsdtIsLoading || buyWaitLoading) {
          setConvertToUsdtInProcessText(
              <>
                  <div className="flex items-center justify-center mb-5">
                      <div role="status">
                          <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                          </svg>
                          <span className="sr-only">Loading...</span>
                      </div>
                      <p className="mt-2 text-sm text-green-200"> Please wait, <span className="font-medium">investment</span> in progress...</p>
                  </div>
              </>
          );
      } else if (buyWaitSuccess) {
          setConvertToUsdtInProcessText(
              <>
                  <div className="flex items-center justify-center mb-5">
                      <p className="mt-2 text-sm text-green-200"><span className="font-medium">Congratulations!</span> Your investment was successful. <br />
                          <span className="font-medium">Welcome on board!</span></p>
                  </div>
              </>
          );
      } else {
          setConvertToUsdtInProcessText(undefined);
      }

  }, [approveIsLoading, buyWithUsdtIsLoading, approveWaitLoading, buyWaitLoading, accountAllowance, usdtAllowanceNeeded, approveWaitSuccess, buyWaitSuccess, approveReset, buyWithUsdtReset]);

  return (
      <>
          <button
              className="bg-red-600 text-white hover:text-white hover:bg-slate-300 active:bg-red-900 font-bold uppercase text-base px-6 py-2 rounded-[18px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(true)}
          >
              <FontAwesomeIcon icon={faDollar} className="ml-2" /> BUY AGS
          </button>
          {showModal ? (
              <>
                  <div className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-1 mx-auto max-w-3xl">
                          <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none">
                              <div className="flex items-start justify-between p-1 border-b border-solid border-gray-300 rounded-t ">
                                  <h3 className="text-white text-sm font=semibold uppercase">
                                      1. AIGOS AMOUNT
                                      2. APPROVE 3. BUY WITH USDT
                                  </h3>
                                  <button
                                      className="bg-transparent border-0 text-white float-right"
                                      onClick={() => setShowModal(false)}
                                  >
                                      <span className="text-white hover:text-white hover:bg-slate-300 active:bg-red-900 text-white opacity-7 h-2 w-2 text-SM block bg-neutral-700 py-0 rounded-full">
                                          X
                                      </span>
                                  </button>
                              </div>
                              <div className="relative p-6 flex-auto">
                                  <form className="bg-gray shadow-md rounded px-6 pt-6 pb-8 w-full"
                                      onSubmit={(e) => {
                                          e.preventDefault();
                                          if (BigInt(accountAllowance?.toString() || 0) >= BigInt(usdtAllowanceNeeded?.toString() || 0)) {
                                              buyWithUsdtWrite?.();
                                          } else {
                                              approveWrite?.();
                                          }
                                      }}>
                                      <div className="flex">
                                          <input
                                              type="text"
                                              placeholder="Enter AGS amount "
                                              className="rounded-none rounded-l-lg border bg-white border border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 placeholder-gray-400 focus:ring-red-500"
                                              value={tokens}
                                              onChange={(e) => setTokens(e.target.value)}
                                          />
                                          <span className="inline-flex items-center px-3 text-sm w-50 text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300">
                                              <g transform="translate(0.000000,240.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                                  <path d="M320 1225 l0 -895 95 0 95 0 0 -112 0 -113 113 113 112 112 688 0 687 0 0 895 0 895 -895 0 -895 0 0 -895z m1195 476 c134 -13 227 -72 280 -177 27 -52 30 -69 30 -149 0 -75 -4 -98 -24 -140 -32 -63 -93 -124 -156 -156 -48 -23 -60 -24 -274 -27 l-224 -3 -169 -165 -169 -164 -106 0 c-80 0 -104 3 -101 13 3 6 81 229 174 494 l169 483 245 -1 c135 0 281 -4 325 -8z" />
                                                  <path d="M1047 1551 c-3 -9 -48 -137 -101 -286 -53 -148 -96 -277 -96 -285 0 -8 46 31 103 87 58 58 118 109 140 118 30 12 78 15 247 15 235 -1 259 4 307 67 20 26 28 50 31 93 5 72 -16 121 -70 161 -48 34 -76 37 -350 42 -180 3 -207 1 -211 -12z" />
                                              </g>
                                              <img src="/logo1.png" alt="AIGOS LOGO" className="relative inline-flex rounded-full h-12 w-12" />
                                              AGS
                                          </span>
                                      </div>
                                      <div className="flex">
                                          <input
                                              type="number"
                                              value={usdt.toFixed(6)}
                                              disabled
                                              readOnly
                                              className={usdtInputBoxClassName}
                                          />
                                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300">
                                              <svg className="relative inline-flex rounded-full w-9 h-9" xmlns="http://www.w3.org/2000/svg" width="2000" height="1750" viewBox="0 0 2000 1750"><path fill="#53ae94" d="M1632.3 0 367.7 0 0 785.98 1000 1750 2000 785.98 1632.3 0z" /><path d="M1138.88,626.12V473.58H1487.7V241.17H537.87V473.58H886.72V626C603.2,639,390,695.17,390,762.43S603.3,885.85,886.72,899v488.59H1139V898.91c283-13.06,495.75-69.17,495.75-136.38S1422,639.22,1139,626.16m0,231.37v-.13c-7.11.45-43.68,2.65-125.09,2.65-65.09,0-110.89-1.85-127-2.69v.21C636.36,846.47,449.4,802.85,449.4,750.66s187-95.75,437.44-106.86V814.11c16.41,1.13,63.33,3.9,128.09,3.9,77.79,0,116.9-3.24,124.07-3.9V643.8c250,11.13,436.53,54.79,436.53,106.8S1388.91,846.29,1139,857.42" fill="#fff" /></svg>
                                              USDT<span className="text-gray-200">-</span>
                                          </span>
                                      </div>
                                      {usdtInputBoxError}
                                  </form>
                              </div>
                              <div className="flex items-center justify-center p-2 border-t border-solid border-blueGray-200 rounded-b">
 <button
 className={convertToUsdtButtonClass}
 disabled={convertToUsdtDisabled}
 onClick={(e) => {
 e.preventDefault();
 // Use optional chaining and BigInt comparisons here, as before
 if (BigInt(accountAllowance?.toString() || 0) >= BigInt(usdtAllowanceNeeded?.toString() || 0)) {
 buyWithUsdtWrite?.();
 } else {
 approveWrite?.();
 }
 }}
 >
 { (approveIsLoading || approveWaitLoading) ? 'Approving USDT...'
 : (buyWithUsdtIsLoading || buyWaitLoading) ? 'Buying Tokens...'
 : (BigInt(accountAllowance?.toString() || 0) >= BigInt(usdtAllowanceNeeded?.toString() || 0)) ? 'Buy Tokens' : 'Approve USDT' }
 </button>
 </div>
 {approveIsError && (
 <div><b>Approve Error:</b> {approveError?.message}</div>
 )}
 {buyWithUsdtIsError && (
 <div><b>Buy Error:</b> {buyWithUsdtError?.message}</div>
 )}
 {convertToUsdtInProcessText}
 </div>
 </div>
 </div>
 </>
 ) : null}
 </>
 );
 };
 
 export default BuyWithUsdtModal;