import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi";
import { useState, useEffect } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import BuyWithUsdtModal from "./buyWithUsdtModal";

export default function SeedSale() {
    const { address: useAccountAddress, isConnected: useAccountIsConnected } = useAccount();

    function Log(stringToLog) {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        console.log(today.toUTCString() + " | " + stringToLog);
    }

    class UserVesting {
        constructor(userVestingData) {
            this.userVestingDataLocal = userVestingData;
            this.totalAmount = 0;
            this.claimedAmount = 0;
            this.claimStart = null;
            this.claimEnd = null;

            if (userVestingData && Array.isArray(userVestingData) && userVestingData.length === 4) {
                const [totalAmount, claimedAmount, claimStart, claimEnd] = userVestingData;
                this.totalAmount = Number(totalAmount) / (10 ** 18);
                this.claimedAmount = Number(claimedAmount);
                this.claimStart = new Date(Number(claimStart) * 1000);
                this.claimEnd = new Date(Number(claimEnd) * 1000);
            } else {
                console.error("Invalid userVestingData:", userVestingData);
            }
        }

        get HtmlOutput() {
            if (this.userVestingDataLocal) {
                return (
                    <div className="flex items-center p-4 space-x-4 w-full text-white bg-black/40 rounded-lg shadow-lg backdrop-blur-sm border border-white/10 transform hover:scale-105 transition-all duration-300">
                        <div className="bg-red-600/20 p-2 rounded-full">
                            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 240 240" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0,240) scale(0.1,-0.1)" fill="currentColor">
                                    <path d="M320 1225 l0 -895 95 0 95 0 0 -117 0 -118 118 118 117 117 683 0 682 0 0 895 0 895 -895 0 -895 0 0 -895z m1195 476 c134 -13 227 -72 280 -177 27 -52 30 -69 30 -149 0 -75 -4 -98 -24 -140 -32 -63 -93 -124 -156 -156 -48 -23 -60 -24 -274 -27 l-224 -3 -169 -165 -169 -164 -106 0 c-80 0 -104 3 -101 13 3 6 81 229 174 494 l169 483 245 -1 c135 0 281 -4 325 -8z" />
                                    <path d="M1047 1551 c-3 -9 -48 -137 -101 -286 -53 -148 -96 -277 -96 -285 0 -8 46 31 103 87 58 58 118 109 140 118 30 12 78 15 247 15 235 -1 259 4 307 67 20 26 28 50 31 93 5 72 -16 121 -70 161 -48 34 -76 37 -350 42 -180 3 -207 1 -211 -12z" />
                                </g>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-lg">
                                {new Intl.NumberFormat().format(this.totalAmount)} AIGOS
                            </p>
                            <p className="text-red-400 text-sm">
                                Your current token balance
                            </p>
                        </div>
                    </div>
                );
            }
            return null;
        }
    }

    class Presale {
        constructor(presaleData) {
            this.preSaleDataLocal = presaleData;
            if (this.preSaleDataLocal) {
                const presaleSplit = presaleData.toString().split(",");
                let counter = 0;
                this.saleToken = presaleSplit[counter++];
                this.startTime = new Date(presaleSplit[counter++] * 1000);
                this.endTime = new Date(presaleSplit[counter++] * 1000);
                this.price = (presaleSplit[counter++] / (10 ** 18));
                this.tokensToSell = presaleSplit[counter++];
                this.tokensToSellParsed = new Intl.NumberFormat().format(this.tokensToSell);
                this.presaleGoal = this.tokensToSell * this.price;
                this.preSaleGoalParsed = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(this.presaleGoal);
                this.baseDecimals = presaleSplit[counter++];
                this.inSale = presaleSplit[counter++];
                this.tokensSold = this.tokensToSell - this.inSale;
                this.presaleFundsRaised = this.tokensSold * this.price;
                this.presaleFundsRaisedParsed = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(this.presaleFundsRaised);
                this.tokensSoldParsed = new Intl.NumberFormat().format(this.tokensSold);
                this.vestingStartTime = new Date(presaleSplit[counter++] * 1000);
                this.vestingCliff = presaleSplit[counter++];
                this.vestingPeriod = presaleSplit[counter++];
                this.enableBuyWithEth = Boolean(parseInt(presaleSplit[counter++]));
                this.enableBuyWithUsdt = Boolean(parseInt(presaleSplit[counter++]));
                this.salePercentage = this.tokensSold * 100 / this.tokensToSell;
                this.salePercentageParsed = this.salePercentage.toFixed(2) + "%";
            }
        }
    }

    const [userVestingInstance, setUserVestingInstance] = useState(null);
    const [presaleDataParsed, setPresaleDataParsed] = useState(null);
    const [displayPresaleData, setDisplayPresaleData] = useState(null);
    const [displayBuyData, setBuyData] = useState(null);
    const [displayUserVestingData, setDisplayUserVestingData] = useState(null);

    const { data: userVestingData } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: process.env.NEXT_PUBLIC_CONTRACT_ABI,
        functionName: "userVesting",
        args: [useAccountAddress, process.env.NEXT_PUBLIC_PRESALE_ID],
        watch: true,
    });

    const { data: presaleData } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS.toString(),
        abi: process.env.NEXT_PUBLIC_CONTRACT_ABI,
        functionName: "presale",
        args: [process.env.NEXT_PUBLIC_PRESALE_ID],
        watch: true,
    });

    useEffect(() => {
        if (userVestingData) {
            setUserVestingInstance(new UserVesting(userVestingData));
        } else {
            setUserVestingInstance(null);
        }
    }, [userVestingData]);

    useEffect(() => {
        if (presaleData) {
            const preSale = new Presale(presaleData);
            setPresaleDataParsed(preSale);
        }
    }, [presaleData]);

    useEffect(() => {
        if (!useAccountAddress) {
            // Not connected state
            setDisplayPresaleData(
                <div className="space-y-4">
                    <div className="w-full bg-gray-700 rounded-full overflow-hidden">
                        <div 
                            className="bg-red-600 text-xs font-medium text-white text-center p-1.5 rounded-full transition-all duration-500"
                            style={{ width: presaleDataParsed?.salePercentageParsed || '0%' }}
                        >
                            {presaleDataParsed?.salePercentageParsed || '0%'}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                            <p className="text-white text-sm font-medium">Tokens Sold</p>
                            <p className="text-red-400 text-lg font-bold">
                                {presaleDataParsed?.tokensSoldParsed || 0} / {presaleDataParsed?.tokensToSellParsed || 0}
                            </p>
                        </div>
                        <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                            <p className="text-white text-sm font-medium">Funds Raised</p>
                            <p className="text-red-400 text-lg font-bold">
                                {presaleDataParsed?.presaleFundsRaisedParsed || '$0'} / {presaleDataParsed?.preSaleGoalParsed || '$0'}
                            </p>
                        </div>
                    </div>
                </div>
            );
            setBuyData(null);
            setDisplayUserVestingData(null);
        } else {
            // Connected state
            setDisplayPresaleData(null);
            setDisplayUserVestingData(userVestingInstance?.HtmlOutput);
            setBuyData(
                <div className="space-y-6">
                    {/* Token Purchase Card */}
                    <div className="bg-black/30 p-16 rounded-xl backdrop-blur-sm border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-left">
                                <p className="text-sm text-white/70">Current Price</p>
                                <p className="text-xl font-bold text-white">
                                    {presaleDataParsed?.price?.toFixed(4) || '0.0000'}$ per AIGOS
                                </p>
                            </div>
                            <div className="bg-red-600/20 p-3 rounded-full">
                                <svg className="w-8 h-8 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
                                    <g transform="translate(0,240) scale(0.1,-0.1)" fill="currentColor">
                                        <path d="M320 1225 l0 -895 95 0 95 0 0 -117 0 -118 118 118 117 117 683 0 682 0 0 895 0 895 -895 0 -895 0 0 -895z m1195 476 c134 -13 227 -72 280 -177 27 -52 30 -69 30 -149 0 -75 -4 -98 -24 -140 -32 -63 -93 -124 -156 -156 -48 -23 -60 -24 -274 -27 l-224 -3 -169 -165 -169 -164 -106 0 c-80 0 -104 3 -101 13 3 6 81 229 174 494 l169 483 245 -1 c135 0 281 -4 325 -8z" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                        
                        {/* Buy button wrapped in a styled container */}
                        <div className="mt-6">
                            <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 p-1 rounded-lg">
                                <BuyWithUsdtModal />
                            </div>
                        </div>
                    </div>

                    {/* Additional stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm">
                            <p className="text-white/70 text-sm">Available</p>
                            <p className="text-white font-bold">
                                {presaleDataParsed?.inSale ? new Intl.NumberFormat().format(presaleDataParsed.inSale) : '0'} AIGOS
                            </p>
                        </div>
                        <div className="bg-black/20 p-4 rounded-lg backdrop-blur-sm">
                            <p className="text-white/70 text-sm">Total Sold</p>
                            <p className="text-white font-bold">
                                {presaleDataParsed?.tokensSoldParsed || '0'} AIGOS
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
    }, [useAccountAddress, presaleDataParsed, userVestingInstance]);

    return (
        <div className="text-center space-y-6">
            <div className="space-y-4">
                <div className="inline-block px-4 py-1 bg-red-600/20 rounded-full">
                    <h2 className="text-white font-medium text-sm md:text-base">
                        ✅ 1st May 2024 to sell out (or 31 Jan 2023)
                    </h2>
                </div>

                <div className="space-y-2">
                    <h3 className="text-white font-bold text-xl md:text-3xl">
                        AIGOS Seed Sale
                    </h3>
                    <p className="text-red-400 text-sm md:text-base animate-pulse">
                        Hurry and buy before seed sale sells out
                    </p>
                </div>
            </div>

            {displayPresaleData}

            <div className="space-y-4">
                {displayUserVestingData}
                {displayBuyData}
            </div>

            <div className="flex justify-center">
                <ConnectButton />
            </div>
        </div>
    );
}
