// pages/homepageComponents/SeedSale.js
import {
    useAccount,
    useContractRead,
} from "wagmi";
import { useState, useEffect } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import BuyWithUsdtModal from "./buyWithUsdtModal"; // Correct relative import
import { formatUnits } from 'ethers/lib/utils';

// Import ABIs
import presaleABI from '../../contracts/presaleABI.json'; // Path from SeedSale.js

export default function SeedSale() {
    const { address, isConnected } = useAccount();

    const { data: userVestingData, isLoading: userVestingIsLoading, isError: userVestingIsError, error: userVestingError } = useContractRead({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: presaleABI, // Use the imported ABI
      functionName: "userVesting",
      args: [address, process.env.NEXT_PUBLIC_PRESALE_ID],
      watch: true,
      enabled: Boolean(address), // Only fetch if connected
    });

    //Error handling
    useEffect(() => {
      if (userVestingIsError) {
          console.error("userVestingData error", userVestingError)
      }
    }, [userVestingIsError, userVestingError]);

    const { data: presaleData, isLoading: presaleIsLoading, isError: presaleDataIsError, error: presaleDataError } = useContractRead({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: presaleABI, // Use the imported ABI
      functionName: "presale",
      args: [process.env.NEXT_PUBLIC_PRESALE_ID],
      watch: true, // Re-fetch on changes.
      enabled: true,  // Always fetch presale data (even if not connected)
    });
    useEffect(() => {
        if (presaleDataIsError) {
            console.error("Presale data read error:", presaleDataError);
        }
    }, [presaleDataIsError, presaleDataError]);

    // --- State ---
    const [presale, setPresale] = useState(null);
    const [userVesting, setUserVesting] = useState(null);


  useEffect(() => {
    if (presaleData && Array.isArray(presaleData) && presaleData.length === 12) {
        const [
            saleToken,
            startTime,
            endTime,
            price,
            tokensToSell,
            baseDecimals,
            inSale,
            vestingStartTime,
            vestingCliff,
            vestingPeriod,
            enableBuyWithEth,
            enableBuyWithUsdt
        ] = presaleData;

        const newPresale = {
            saleToken: String(saleToken),
            startTime: new Date(Number(startTime) * 1000),
            endTime: new Date(Number(endTime) * 1000),
            price: Number(formatUnits(BigInt(price), 18)), // Format price
            tokensToSell: BigInt(tokensToSell),
            tokensToSellParsed: Number(formatUnits(BigInt(tokensToSell),0)).toLocaleString(),
            presaleGoal: Number(formatUnits(BigInt(tokensToSell) * BigInt(price), 18)),
            preSaleGoalParsed: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(formatUnits(BigInt(tokensToSell) * BigInt(price), 18))),
            baseDecimals: String(baseDecimals),
            inSale: BigInt(inSale),
            tokensSold: BigInt(tokensToSell) - BigInt(inSale),
            presaleFundsRaised: Number(formatUnits((BigInt(tokensToSell) - BigInt(inSale)) * BigInt(price),18)),
            presaleFundsRaisedParsed:  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(formatUnits((BigInt(tokensToSell) - BigInt(inSale)) * BigInt(price),18))),
            tokensSoldParsed:  Number(formatUnits((BigInt(tokensToSell) - BigInt(inSale)),0)).toLocaleString(),
            vestingStartTime: new Date(Number(vestingStartTime) * 1000),
            vestingCliff: String(vestingCliff),
            vestingPeriod: String(vestingPeriod),
            enableBuyWithEth: Boolean(enableBuyWithEth),
            enableBuyWithUsdt: Boolean(enableBuyWithUsdt),
            salePercentage: Number((BigInt(tokensToSell) - BigInt(inSale)) * 100n / BigInt(tokensToSell)),
            salePercentageParsed:  ((Number((BigInt(tokensToSell) - BigInt(inSale)) * 100n / BigInt(tokensToSell))).toFixed(2)) + "%",
        };

        setPresale(newPresale);
    }  else if (!presaleData) {
      setPresale(null)
    }
}, [presaleData]);

useEffect(() => {
    if (userVestingData && Array.isArray(userVestingData) && userVestingData.length === 4)
    {
      const [totalAmount, claimedAmount, claimStart, claimEnd] = userVestingData;
        const newUserVesting = {
            totalAmount: Number(formatUnits(BigInt(totalAmount), 18)),  // Format: Convert BigInt to number
            claimedAmount: Number(claimedAmount),
            claimStart: new Date(Number(claimStart) * 1000),
            claimEnd: new Date(Number(claimEnd) * 1000),
        };
        setUserVesting(newUserVesting);
    } else if (!userVestingData){
      setUserVesting(null);
    }
}, [userVestingData]);

    return (
        <div className="text-center space-y-6">
            <div className="space-y-4">
                    <h2 className="text-white font-medium text-sm md:text-base">
                        ✅ 3rd March 2025 until sold out ✅
                    </h2>
                
                <div className="space-y-2">
                    <h3 className="text-white font-bold text-xl md:text-3xl">
                        AIGOS Presale
                    </h3>
                    <p className="text-red-400 text-sm md:text-base animate-pulse">
                        Hurry and buy before Aigos sells out
                    </p>
                </div>
            </div>

            {/* Display presale data when not connected */}
            {!isConnected && presale && (
                <div className="space-y-4">
                    <div className="w-full bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="bg-red-600 text-xs font-medium text-white text-center p-1.5 rounded-full transition-all duration-500"
                            style={{ width: presale.salePercentageParsed }}
                        >
                            {presale.salePercentageParsed}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                            <p className="text-white text-sm font-medium">Tokens Sold</p>
                            <p className="text-red-400 text-lg font-bold">
                                {presale.tokensSoldParsed} / {presale.tokensToSellParsed}
                            </p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                            <p className="text-white text-sm font-medium">Funds Raised</p>
                            <p className="text-red-400 text-lg font-bold">
                                {presale.presaleFundsRaisedParsed} / {presale.preSaleGoalParsed}
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {/* Display User Vesting and Buy Data */}
            {isConnected && (
                <div className="space-y-6">
                    {userVesting && (
                    <div className="flex items-center p-4 space-x-2 w-full text-white bg-black/40 rounded-lg shadow-lg backdrop-blur-sm border border-white/10 transform hover:scale-105 transition-all duration-300">
                          <img src="/logo1.png" alt="AIGOS LOGO" className="w-12 h-12" />
                        <div className="flex-1">
                            <p className="font-semibold text-lg">
                            {new Intl.NumberFormat().format(userVesting.totalAmount)} AGS
                            </p>
                            <p className="text-red-400 text-sm">
                            Your current token balance
                            </p>
                        </div>
                    </div>
                    )}
                    {/* Token Purchase Card */}
                    <div className="bg-black/30 p-16 rounded-xl backdrop-blur-sm border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-left">
                                <p className="text-sm text-white/70">Current Price</p>
                                <p className="text-xl font-bold text-white">
                                    {presale? presale.price.toFixed(4) : '0.0000'}$ per AGS
                                </p>
                            </div>
                            
                <img src="/logo1.png" alt="AIGOS LOGO" className="w-8 h-8" />
                            
                        </div>

                        <div className="mt-6">
                            <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 p-1 rounded-lg">
                                <BuyWithUsdtModal />
                            </div>
                        </div>
                    </div>
                    {/* Additional stats */}
                  {presale ? (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm">
                            <p className="text-white/70 text-sm">Available</p>
                            <p className="text-white font-bold">
                                {presale.inSale ? new Intl.NumberFormat().format(Number(presale.inSale)) : '0'} AGS
                            </p>
                        </div>
                        <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm">
                            <p className="text-white/70 text-sm">Total Sold</p>
                            <p className="text-white font-bold">
                                {presale.tokensSoldParsed || '0'} AGS
                            </p>
                        </div>
                    </div>
                    ) : null}
                </div>
            )}

            <div className="flex justify-center">
                <ConnectButton />
            </div>
        </div>
    );
}