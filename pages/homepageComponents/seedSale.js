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
import axios from 'axios';

export default function SeedSale() {
    const { address: useAccountAddress, connector: useAccountActiveConnector, isConnected: useAccountIsConnected } = useAccount()
    const [referralLink, setReferralLink] = useState('');
    const [referralCount, setReferralCount] = useState(0);
    const [earnedRewards, setEarnedRewards] = useState(0);
    const [loading, setLoading] = useState(true);
    const initialReferralData = {
        referral_link: '',
        referral_count: 0,
        rewards: 0
    };
    
        useEffect(() => {
            fetchData();
        }, []);
    
        const fetchData = async () => {
            try {
                // Fetch referral data from the server
                const response = await axios.get(`/.netlify/functions/referralData`, {
                    headers: {
                        'useaccountadress': useAccountAddress
                    }
                });
                const data = response.data;
    
                if (data) {
                    setReferralLink(data.referral_link);
                    setReferralCount(data.referral_count);
                    setEarnedRewards(data.rewards);
                } else {
                    // If referral data doesn't exist, generate new referral link and save
                    const generatedReferralLink = `/.netlify/functions/?ref=${useAccountAddress}`;
                    setReferralLink(generatedReferralLink);
                    setReferralCount(0);
                    setEarnedRewards(0);
                    await saveReferralData({
                        referral_link: generatedReferralLink,
                        referral_count: 0,
                        rewards: 0
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error('Error reading referral data:', error);
                setLoading(false);
            }
        };
    
        const saveReferralData = async (newData) => {
            try {
                // Save referral data to the server
                const response = await axios.put( `/.netlify/functions/updateReferralData`, newData, {
                    headers: {
                        'useaccountadress': useAccountAddress
                    }
                });
                if (response.status === 200) {
                    setReferralLink(newData.referral_link);
                    setReferralCount(newData.referral_count);
                    setEarnedRewards(newData.rewards);
                } else {
                    console.error('Error updating data:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating data:', error);
            }
        };
    
        useEffect(() => {
            // Check if the user landed on the app with a referral link
            const landingURL = window.location.href;
            const urlParams = new URLSearchParams(landingURL);
            const referralLinkParam = urlParams.get('referrallink');
    
            if (referralLinkParam) {
                // If user landed with a referral link, update referral data for the referrer
                const earnedRewards = 5; // Fixed reward for the referrer
                updateReferralData(referralLinkParam, earnedRewards);
            } else {
                // If no referral link parameter found, simply update user's referral data
                saveReferralData({
                    referral_link: referralLink, // Use the generated referral link
                    referral_count: referralCount, // No change in count
                    rewards: earnedRewards // No change in rewards
                });
            }
        }, [referralLink, referralCount, earnedRewards]);
    
        const updateReferralData = async (referralLinkParam, earnedRewards) => {
            try {
                // Update referral data for the referrer
                const response = await axios.put(`/.netlify/functions//updateReferralData`, {
                    referral_link: referralLinkParam,
                    rewards: earnedRewards,
                    referral_count: referralCount + 1
                }, {
                    headers: {
                        'useaccountadress': referralLinkParam
                    }
                });
                if (response.status === 200) {
                    // Handle success if needed
                } else {
                    console.error('Error updating data:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating data:', error);
            }
        };
            
    
    /**
     * @fn Log
     * @brief Log to console
     */
    function Log(stringToLog) {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        console.log(today.toUTCString() + " | " + stringToLog);
    }

    /**
     * @class UserVesting
     * @brief User Vesting Data
     */
    class UserVesting {
        constructor(userVestingData) {
            this.userVestingDataLocal = userVestingData;
            if (userVestingData) {
                var userVestingSplit = userVestingData.toString().split(",");
                var counter = 0;
                this.totalAmount = userVestingSplit[counter++] / (10 ** 18);
                this.claimedAmount = userVestingSplit[counter++];
                this.claimStart = new Date(userVestingSplit[counter++] * 1000);
                this.claimEnd = new Date(userVestingSplit[counter++] * 1000);
            }
        }

        get HtmlOutput() {
            if (this.userVestingDataLocal) {
                return (
                    <>
                        <div id="toast-simple" className="flex justify-center items-center p-4 space-x-4 w-full max-w-xs text-white bg-neutral-800 rounded-lg divide-x divide-gray-200 shadow space-x" role="alert">
                            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" version="1.0" width="240.000000pt" height="240.000000pt" viewBox="0 0 240.000000 240.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,240.000000) scale(0.100000,-0.100000)" fill="#FFFFFF" stroke="none">
                                    <path d="M320 1225 l0 -895 95 0 95 0 0 -117 0 -118 118 118 117 117 683 0 682 0 0 895 0 895 -895 0 -895 0 0 -895z m1195 476 c134 -13 227 -72 280 -177 27 -52 30 -69 30 -149 0 -75 -4 -98 -24 -140 -32 -63 -93 -124 -156 -156 -48 -23 -60 -24 -274 -27 l-224 -3 -169 -165 -169 -164 -106 0 c-80 0 -104 3 -101 13 3 6 81 229 174 494 l169 483 245 -1 c-135 0 -281 -4 -325 -8z" />
                                    <path d="M1047 1551 c-3 -9 -48 -137 -101 -286 -53 -148 -96 -277 -96 -285 0 -8 46 31 103 87 58 58 118 109 140 118 30 12 78 15 247 15 235 -1 259 4 307 67 20 26 28 50 31 93 5 72 -16 121 -70 161 -48 34 -76 37 -350 42 -180 3 -207 1 -211 -12z" />
                                </g>
                            </svg>
                            <div className="pl-4 text-sm font-normal">You own already {new Intl.NumberFormat().format(this.totalAmount)} Aigos<br />
                                You're still on time to buy more!</div>
                        </div>
                    </>
                )
            }
            else {
                return (<></>);
            }
        }
    }

    /* User Vesting */
    const { data: userVestingData } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS.toString(),
        abi: process.env.NEXT_PUBLIC_CONTRACT_ABI,
        functionName: "userVesting",
        args: [useAccountAddress, process.env.NEXT_PUBLIC_PRESALE_ID],
        watch: true,
    });

    /**
     * @class Presale
     * @brief Presale Data
     */
    class Presale {
        constructor(presaleData) {
            this.preSaleDataLocal = presaleData;
            if (this.preSaleDataLocal) {
                var presaleSplit = presaleData.toString().split(",");
                var counter = 0;
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

        get HtmlOutput() {
            if (this.preSaleDataLocal) {
                return (
                    <>
                        <p>Sale Token: {this.saleToken}</p>
                        <p>startTime: {this.startTime.toLocaleString("default")}</p>
                        <p>endTime: {this.endTime.toLocaleString("default")}</p>
                        <p>price: {this.price.toFixed(3)}$ per Token</p>
                        <p>tokensToSell: {new Intl.NumberFormat().format(this.tokensToSell)} Token</p>
                        <p>inSale: {new Intl.NumberFormat().format(this.inSale)} Token</p>
                        <p>tokensSold: {new Intl.NumberFormat().format(this.tokensSold)} Token</p>
                        <p>presaleGoal: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(this.presaleGoal)} $</p>
                        <p>baseDecimals: {this.baseDecimals}</p>
                        <p>vestingStartTime: {this.vestingStartTime.toLocaleString("default")}</p>
                        <p>vestingCliff: {this.vestingCliff}</p>
                        <p>vestingPeriod: {this.vestingPeriod}</p>
                        <p>enableBuyWithEth: {this.enableBuyWithEth.toString()}</p>
                        <p>enableBuyWithUsdt: {this.enableBuyWithUsdt.toString()}</p>
                    </>
                )
            }
            else return (<></>);
        }
    }

    /*!
     * @fn printPresaleData
     * @brief Print Presale Data
     */
    function printPresaleData(presaleData) {
        var preSale = new Presale(presaleData);
        setPresaleDataParsed(preSale);
    }

    /* Presale Data */
    const [presaleDataParsed, setPresaleDataParsed] = useState(0);
    const { data: presaleData,
        error: presaleDataError,
        isError: presaleIsError,
        isLoading: presaleIsLoading,
        status: presaleStatus } = useContractRead({
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS.toString(),
            abi: process.env.NEXT_PUBLIC_CONTRACT_ABI,
            functionName: "presale",
            args: [process.env.NEXT_PUBLIC_PRESALE_ID],
            watch: false,
        });

    /* ------------------- */

    /* Presale Data */
    useEffect(() => {
        Log("----------> presaleData: " + presaleData);
        Log("----------> presaleDataError: " + presaleDataError);
        Log("----------> presaleIsError: " + presaleIsError);
        Log("----------> presaleIsLoading: " + presaleIsLoading);
        Log("----------> presaleStatus: " + presaleStatus);
        printPresaleData(presaleData);
    }, [presaleData, presaleDataError, presaleIsError, presaleIsLoading, presaleStatus]);

    /* Wallet Connected / Disconnected */
    const [displayPresaleData, setDisplayPresaleData] = useState(0);
    const [displayBuyData, setBuyData] = useState(0);
    const [displayUserVestingData, setDisplayUserVestingData] = useState(0);
    useEffect(() => {
        if (!useAccountAddress) {
            setDisplayPresaleData(
                <>
                    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-3">
                        <div className="bg-red-600 text-xs font-medium font-bold text-neutral-900 text-center p-0.5 leading-none rounded-full"
                            style={{ width: presaleDataParsed?.salePercentageParsed }}>
                            {presaleDataParsed?.salePercentageParsed}
                        </div>
                    </div>
                    <p className="text-white">
                        Sold — {presaleDataParsed?.tokensSoldParsed}
                        /
                        {presaleDataParsed?.tokensToSellParsed}
                    </p>
                    <p className="text-white mb-6">
                        Sold — {presaleDataParsed?.presaleFundsRaisedParsed}
                        /
                        {presaleDataParsed?.preSaleGoalParsed}
                    </p>
                </>
            );
            setBuyData("");
            setDisplayUserVestingData("");
        }
        else {
            setDisplayPresaleData("");
            var userVesting = new UserVesting(userVestingData);
            setDisplayUserVestingData(userVesting.HtmlOutput);
            setBuyData(<>
                <div className="flex items-center justify-center mb-6 mt-5">
                    <svg className="animate-bounce w-16 h-16" xmlns="http://www.w3.org/2000/svg" version="1.0" width="240.000000pt" height="240.000000pt" viewBox="0 0 240.000000 240.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,240.000000) scale(0.100000,-0.100000)" fill="#FFFFFF" stroke="none">
                            <path d="M320 1225 l0 -895 95 0 95 0 0 -117 0 -118 118 118 117 117 683 0 682 0 0 895 0 895 -895 0 -895 0 0 -895z m1195 476 c134 -13 227 -72 280 -177 27 -52 30 -69 30 -149 0 -75 -4 -98 -24 -140 -32 -63 -93 -124 -156 -156 -48 -23 -60 -24 -274 -27 l-224 -3 -169 -165 -169 -164 -106 0 c-80 0 -104 3 -101 13 3 6 81 229 174 494 l169 483 245 -1 c-135 0 -281 -4 -325 -8z" />
                            <path d="M1047 1551 c-3 -9 -48 -137 -101 -286 -53 -148 -96 -277 -96 -285 0 -8 46 31 103 87 58 58 118 109 140 118 30 12 78 15 247 15 235 -1 259 4 307 67 20 26 28 50 31 93 5 72 -16 121 -70 161 -48 34 -76 37 -350 42 -180 3 -207 1 -211 -12z" />
                        </g>
                    </svg>
                </div>
                <div className="flex items-center justify-center mb-6 mt-5">
                    <BuyWithUsdtModal />
                </div>
            </>);
        }
    }, [useAccountAddress, presaleDataParsed, userVestingData]);

    return (
        <>
            <div className="text-center">
                <div className="box-cont h-fit w-fit px-14 mb-10 py-8 shadow-md bg-neutral-900 rounded-lg">
                    <h7 className="text-white font-bold">
                        ✅ 1st MAY 2024 to 8th Aug 2024<br />
                        Presale
                    </h7>
                    <h4 className="text-white font-bold text-4xl">
                        1 Token = {presaleDataParsed?.price?.toFixed(4)}$
                    </h4>
                    <p className="text-white mb-4">
                        Hurry and buy to guarantee your Aigos allocation
                    </p>
                    {displayPresaleData}
                    <div className="flex place-items-center justify-around">
                        {displayUserVestingData}
                    </div>
                    {displayBuyData}
                    <div className="flex place-items-center justify-around">
                        <ConnectButton />
                    </div>
                    
                    <div id="toast-simple" className="flex justify-center items-center p-4 space-x-4 w-full max-w-xl text-white bg-neutral-800 rounded-lg divide-x divide-gray-200 shadow space-x" role="alert">
                    <div className="text-center-white pl-4 text-xl font-normal"></div>
                            <p>Referral Dashboard</p>
                        <div className="text-center-white pl-4 text-sm font-normal">
                            <p>Your referral link is:</p>
                            <p>http://localhost:3000/?ref={referralLink}</p>
                            <p>You already have {referralCount} referrals</p>
                            <p>You already have {earnedRewards} rewards</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
