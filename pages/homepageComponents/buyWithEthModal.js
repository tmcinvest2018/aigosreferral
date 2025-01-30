import React, { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction, useBalance } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

const BuyWithEthModal = () => {
  const [tokenAmount, setTokenAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [ethAmount, setEthAmount] = useState('0');
  const [ethInputBoxClassName, setEthInputBoxClassName] = useState('');
  const [ethInputBoxError, setEthInputBoxError] = useState('');
  const [buyButtonClass, setBuyButtonClass] = useState('');
  const [buyButtonDisabled, setBuyButtonDisabled] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState('');

  const { address: userAddress, isConnected } = useAccount();

  // Get user's ETH balance
  const { data: ethBalance } = useBalance({
    address: userAddress,
    watch: true,
  });

  // Get required ETH amount for tokens
  const { data: requiredEthAmount } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: process.env.NEXT_PUBLIC_CONTRACT_ABI,
    functionName: 'ethBuyHelper',
    args: [process.env.NEXT_PUBLIC_PRESALE_ID, tokenAmount ? BigInt(tokenAmount) : BigInt(0)],
    enabled: Boolean(tokenAmount),
    watch: true,
  });

  // Prepare buy with ETH transaction
  const { config: buyWithEthConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: process.env.NEXT_PUBLIC_CONTRACT_ABI,
    functionName: 'buyWithEth',
    args: [process.env.NEXT_PUBLIC_PRESALE_ID, BigInt(tokenAmount || '0')],
    value: requiredEthAmount,
    enabled: Boolean(tokenAmount && requiredEthAmount && isConnected),
  });

  const { write: buyWithEth, data: buyWithEthData, isLoading: isBuyLoading } = useContractWrite(buyWithEthConfig);

  const { isLoading: isTransactionLoading, isSuccess: isTransactionSuccess } = useWaitForTransaction({
    hash: buyWithEthData?.hash,
  });

  // Update ETH amount when helper returns value
  useEffect(() => {
    if (requiredEthAmount) {
      const formattedAmount = formatEther(requiredEthAmount);
      setEthAmount(formattedAmount);
      
      // Check if user has enough ETH
      if (ethBalance && parseFloat(formattedAmount) <= parseFloat(formatEther(ethBalance.value))) {
        setEthInputBoxClassName("rounded-none rounded-l-lg border bg-gray-300 border border-gray-300 text-gray-900 block cursor-not-allowed flex-1 min-w-0 w-full text-sm p-2.5 placeholder-gray-400 focus:ring-blue-500");
        setEthInputBoxError("");
        setBuyButtonClass("bg-blue-600 text-white hover:text-white hover:bg-slate-300 active:bg-blue-900 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150");
        setBuyButtonDisabled(false);
      } else {
        setEthInputBoxClassName("rounded-none rounded-l-lg border bg-red-50 border border-red-500 text-red-900 block cursor-not-allowed flex-1 min-w-0 w-full text-sm p-2.5 placeholder-gray-400 focus:ring-red-500");
        setEthInputBoxError(
          <div className="flex">
            <p className="mt-2 text-sm text-red-600">
              <span className="font-medium">Oh, snap!</span> Insufficient ETH Balance.<br />
              Current balance: <span className="font-medium">{ethBalance ? formatEther(ethBalance.value) : '0'}</span> ETH
            </p>
          </div>
        );
        setBuyButtonClass("cursor-not-allowed bg-gray-300 text-neutral-900 text-white font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150");
        setBuyButtonDisabled(true);
      }
    }
  }, [requiredEthAmount, ethBalance]);

  // Update transaction status
  useEffect(() => {
    if (isTransactionLoading || isBuyLoading) {
      setBuyButtonDisabled(true);
      setBuyButtonClass("cursor-not-allowed bg-gray-300 text-neutral-900 text-white font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150");
      setTransactionStatus(
        <div className="flex items-center justify-center mb-5">
          <div role="status">
            <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2 text-sm text-blue-200">Please wait, investment in progress...</p>
        </div>
      );
    } else if (isTransactionSuccess) {
      setTransactionStatus(
        <div className="flex items-center justify-center mb-5">
          <p className="mt-2 text-sm text-green-200">
            <span className="font-medium">Congratulations!</span> Your investment was successful.<br />
            <span className="font-medium">Welcome on board!</span>
          </p>
        </div>
      );
    } else {
      setTransactionStatus("");
    }
  }, [isTransactionLoading, isBuyLoading, isTransactionSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    buyWithEth?.();
  };

  return (
    <>
      <button
        className="bg-blue-600 text-white hover:text-white hover:bg-slate-300 active:bg-blue-900 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        BUY WITH ETH <FontAwesomeIcon icon={faEthereum} className="ml-2" />
      </button>

      {showModal && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-900 outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-white text-3xl font=semibold uppercase">Exchange</h3>
                <button
                  className="bg-transparent border-0 text-white float-right"
                  onClick={() => setShowModal(false)}
                >
                  <span className="text-white hover:text-white hover:bg-slate-300 active:bg-blue-900 text-white opacity-7 h-6 w-6 text-xl block bg-neutral-700 py-0 rounded-full">
                    X
                  </span>
                </button>
              </div>

              <div className="relative p-6 flex-auto">
                <form className="bg-neutral-800 shadow-md rounded px-8 pt-6 pb-8 w-full" onSubmit={handleSubmit}>
                  <div className="flex">
                    <input 
                      type="number"
                      value={tokenAmount}
                      onChange={(e) => setTokenAmount(e.target.value)}
                      className="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500"
                      placeholder="Enter amount of tokens"
                    />
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300">
                      TOKEN
                    </span>
                  </div>

                  <div className="flex mt-4">
                    <input
                      type="number"
                      value={ethAmount}
                      disabled
                      readOnly
                      className={ethInputBoxClassName}
                    />
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300">
                      ETH
                    </span>
                  </div>
                  {ethInputBoxError}
                </form>
              </div>

              <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className={buyButtonClass}
                  disabled={buyButtonDisabled}
                  onClick={handleSubmit}
                >
                  BUY WITH ETH
                </button>
              </div>
              {transactionStatus}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyWithEthModal;