// pages/homepageComponents/seedSale.js
import { useAccount, useSignMessage, useContractRead } from "wagmi";
import { useState, useEffect } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import BuyWithUsdtModal from "./buyWithUsdtModal";
import { formatUnits } from 'ethers/lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCalendarAlt, faTags } from "@fortawesome/free-solid-svg-icons"; // Added icons
import Typewriter from 'typewriter-effect';

import presaleABI from '../../contracts/presaleABI.json';

export default function SeedSale() {
    const { address, isConnected } = useAccount();
    const { login, isAuthenticated, token, logout } = useAuth();
    const { signMessage, data: signature, isLoading: isSigning, error: signError } = useSignMessage();

    const [presale, setPresale] = useState(null);
    const [userVesting, setUserVesting] = useState(null);
    const [referralData, setReferralData] = useState(null);
    const [loadingReferral, setLoadingReferral] = useState(false);
    const [referralError, setReferralError] = useState(null);
    const [progress, setProgress] = useState(0); // State for progress bar


    const { data: userVestingData, isLoading: userVestingIsLoading, isError: userVestingIsError, error: userVestingError } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: presaleABI,
        functionName: "userVesting",
        args: [address, process.env.NEXT_PUBLIC_PRESALE_ID],
        watch: true,
        enabled: Boolean(address),
    });

      useEffect(() => {
        if (userVestingIsError) {
            console.error("userVestingData error", userVestingError)
        }
    }, [userVestingIsError, userVestingError]);

    const { data: presaleData, isLoading: presaleIsLoading, isError: presaleDataIsError, error: presaleDataError } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: presaleABI,
        functionName: "presale",
        args: [process.env.NEXT_PUBLIC_PRESALE_ID],
        watch: true,
        enabled: true,
    });

    useEffect(() => {
      if (presaleDataIsError) {
        console.error("Presale data read error:", presaleDataError);
      }
    }, [presaleDataIsError, presaleDataError]);

    useEffect(() => {
      if (presaleData && Array.isArray(presaleData) && presaleData.length === 12) {
          const [
              saleToken, startTime, endTime, price, tokensToSell,
              baseDecimals, inSale, vestingStartTime, vestingCliff,
              vestingPeriod, enableBuyWithEth, enableBuyWithUsdt
          ] = presaleData;

          const newPresale = {
              saleToken: String(saleToken),
              startTime: new Date(Number(startTime) * 1000),
              endTime: new Date(Number(endTime) * 1000),
              price: Number(formatUnits(BigInt(price), 18)),
              tokensToSell: BigInt(tokensToSell),
              tokensToSellParsed: Number(formatUnits(BigInt(tokensToSell), 0)).toLocaleString(),
              presaleGoal: Number(formatUnits(BigInt(tokensToSell) * BigInt(price), 18)),
              preSaleGoalParsed: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(formatUnits(BigInt(tokensToSell) * BigInt(price), 18))),
              baseDecimals: String(baseDecimals),
              inSale: BigInt(inSale),
              tokensSold: BigInt(tokensToSell) - BigInt(inSale),
              presaleFundsRaised: Number(formatUnits((BigInt(tokensToSell) - BigInt(inSale)) * BigInt(price), 18)),
              presaleFundsRaisedParsed: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(formatUnits((BigInt(tokensToSell) - BigInt(inSale)) * BigInt(price), 18))),
              tokensSoldParsed: Number(formatUnits((BigInt(tokensToSell) - BigInt(inSale)), 0)).toLocaleString(),
              vestingStartTime: new Date(Number(vestingStartTime) * 1000),
              vestingCliff: String(vestingCliff),
              vestingPeriod: String(vestingPeriod),
              enableBuyWithEth: Boolean(enableBuyWithEth),
              enableBuyWithUsdt: Boolean(enableBuyWithUsdt),
              salePercentage: Number((BigInt(tokensToSell) - BigInt(inSale)) * 100n / BigInt(tokensToSell)),
              salePercentageParsed: ((Number((BigInt(tokensToSell) - BigInt(inSale)) * 100n / BigInt(tokensToSell))).toFixed(2)) + "%",
          };
          setPresale(newPresale);

            // Calculate the progress percentage
            if (newPresale.tokensToSell > 0) {
              const progressValue = (Number(newPresale.tokensSold) / Number(newPresale.tokensToSell)) * 100;
              setProgress(progressValue);
            } else {
                setProgress(0);
            }


      } else if (!presaleData){
          setPresale(null);
      }
  }, [presaleData]);

     useEffect(() => {
        if (userVestingData && Array.isArray(userVestingData) && userVestingData.length === 4)
        {
        const [totalAmount, claimedAmount, claimStart, claimEnd] = userVestingData;
        const newUserVesting = {
        totalAmount: Number(formatUnits(BigInt(totalAmount), 18)),
        claimedAmount: Number(claimedAmount),
        claimStart: new Date(Number(claimStart) * 1000),
        claimEnd: new Date(Number(claimEnd) * 1000),
        };
        setUserVesting(newUserVesting);
        } else if (!userVestingData){
        setUserVesting(null); // Correctly set to null if no data
        }
        }, [userVestingData]);

    // Authentication logic (signing the message)
    useEffect(() => {
        const handleAuthentication = async () => {
            if (isConnected && address && !signature) {
                try {
                    const message = "Sign this message to access your referral dashboard on [Your dApp Name].";
                    console.log("Requesting signature for:", address);
                    console.log("Message to sign:", message);
                    await signMessage({ message });

                  } catch (error) {
                    console.error("Error initiating signing:", error);
                  }
            }
        };

        handleAuthentication();
    }, [isConnected, address, signMessage, signature]);

    // Handle successful signature
    useEffect(() => {
        const handleSuccessfulSignature = async () => {
            if (signature && address) {
                console.log("Signature received:", signature);
                try {
                    const authResponse = await fetch('/api/auth', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ address, signature }),
                    });

                    if (!authResponse.ok) {
                        const errorData = await authResponse.json();
                        console.error("Authentication error:", errorData);
                        return;
                    }
                    const { token } = await authResponse.json();
                    console.log("Token received:", token);
                    login(token);
                } catch (error) {
                    console.error("Error during authentication:", error);
                }
            }
        };

        handleSuccessfulSignature();
    }, [signature, address, login]);

    // Fetch referral data
    useEffect(() => {
      const fetchData = async () => {
        if (isAuthenticated && token) {
          setLoadingReferral(true);
          try {
            const response = await fetch('/api/referral', {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error(`Referral data fetch failed: ${response.status}`);
            }

            const data = await response.json();
            setReferralData(data);
          } catch (err) {
            setReferralError(err.message);
          } finally {
            setLoadingReferral(false);
          }
        }
      };

      if (isConnected) {
        fetchData();
      }
    }, [isAuthenticated, token, isConnected, logout]);


    return (
        <>
            <div className="text-center space-y-6">
                <div className="space-y-4">
                    <h2 className="text-red-500 font-medium text-sm md:text-base">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> {/* Calendar icon */}
                         3rd March 2025 until sold out 
                    </h2>

                    <div className="space-y-2">
                        <h3 className="text-black font-bold text-xl md:text-3xl">
                            AIGOS Presale
                        </h3>
                        <p className="text-red-500 text-sm md:text-base animate-pulse">
                            <FontAwesomeIcon icon={faTags} className="mr-2" />  {/* Tags icon */}
                            Hurry and buy before Aigos sells out
                        </p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <ConnectButton />
                </div>

                {isConnected && (
                    <div className="space-y-6">
                        {userVestingData && (
                            <div className="flex items-center p-4 space-x-2 w-full text-black bg-white/50 rounded-2xl shadow-lg backdrop-blur-sm border border-purple-400/30 transform hover:scale-105 transition-all duration-300">
                                <img src="/logo1.png" alt="AIGOS LOGO" className="w-12 h-12" />
                                <div className="flex-1">
                                    <p className="font-semibold text-lg">
                                        {new Intl.NumberFormat().format(userVestingData[0] / BigInt(10 ** 18))} AGS
                                    </p>
                                    <p className="text-red-500 text-sm">
                                        Your current token balance
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Progress Bar */}
                        {presale && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div
                                    className="bg-gradient-to-r from-red-500 to-purple-600 h-2.5 rounded-full"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        )}


                        {/* Token Purchase Card */}
                        <div className="bg-white/30 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-purple-400/30">
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-left">
                                    <p className="text-sm text-gray-700">Current Price</p>
                                    <p className="text-xl font-bold text-black">
                                        {presale ? presale.price.toFixed(4) : '0.0000'}$ per AGS
                                    </p>
                                </div>
                                <img src="/logo1.png" alt="AIGOS LOGO" className="w-8 h-8" />
                            </div>

                            <div className="mt-6">
                                <div className="bg-gradient-to-r from-red-500 to-purple-600 p-0.5 rounded-lg">
                                    <BuyWithUsdtModal />
                                </div>
                            </div>
                        </div>

                         {/* Available and Sold Tokens - Moved down */}
                         {presale ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/30 p-4 rounded-2xl backdrop-blur-md border border-purple-400/20">
                                    <p className="text-gray-700 text-sm">Available</p>
                                    <p className="text-black font-bold">
                                        {presale.inSale ? new Intl.NumberFormat().format(Number(presale.inSale)) : '0'} AGS
                                    </p>
                                </div>
                                <div className="bg-white/30 p-4 rounded-2xl backdrop-blur-md border border-purple-400/20">
                                    <p className="text-gray-700 text-sm">Total Sold</p>
                                    <p className="text-black font-bold">
                                        {presale.tokensSoldParsed || '0'} AGS
                                    </p>
                                </div>
                            </div>
                            ) : null}


                        {/* Integrated Dashboard */}
                        {isAuthenticated && (
                            <div className="mt-8 p-4 bg-white/50 rounded-2xl backdrop-blur-md border border-purple-400/30">
                                <h2 className="text-xl font-bold text-red-500 mb-4">Referral Dashboard</h2>
                                {loadingReferral ? (
                                    <p className="text-black">Loading referral data...</p>
                                ) : referralError ? (
                                    <p className="text-red-500">Error: {referralError}</p>
                                ) : referralData ? (
                                    <>
                                        <p className="text-black">Your Referral Link: <a href={referralData.referral_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all text-sm">{referralData.referral_link}</a></p>
                                        <p className="text-black">Total Referrals: {referralData.total_referred}</p>
                                        <p className="text-black">Total Rewards (USDT): {referralData.total_rewards.toFixed(2)}</p>
                                    </>
                                ) : (
                                    <p className="text-black">No referral data found.</p>
                                )}
                            </div>
                        )}

                    </div>
                )}

            </div>
        </>
    );
}