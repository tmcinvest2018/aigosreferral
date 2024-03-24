import { useEffect, useState } from "react";
import { useAccount, useWeb3 } from "wagmi";
import buyWithUsdtModal from "./buyWithUsdtModal"; 
import { fetchReferralData, updateReferralData } from '../utils/apidb';

export default function ReferralManager() {
    const { address: useAccountAddress } = useAccount();
    const { waitForTransactionSuccess } = useWeb3();
    const [usdtValue, setUsdtValue] = useState(0);

    useEffect(() => {
        const unsubscribe = BuyWithUsdtModal.onUsdtValueChange(setUsdtValue);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (usdtValue > 0) {
            waitForTransactionSuccess().then(() => {
                handleReferralReward();
            });
        }
    }, [usdtValue, waitForTransactionSuccess]);

    useEffect(() => {
        if (useAccountAddress) {
            handleReferralData(useAccountAddress);
        }
    }, [useAccountAddress]);

    const handleReferralData = async (address) => {
        try {
            const referralData = await fetchReferralData();
            if (!referralData[address]) {
                const referralLink = generateReferralLink(address);
                referralData[address] = {
                    referral_link: referralLink,
                    referral_count: 0,
                    rewards: 0
                };
                await updateReferralData(referralData);
            }
        } catch (error) {
            console.error('Error fetching or updating referral data:', error);
        }
    };

    const handleReferralReward = async () => {
        try {
            const referralData = await fetchReferralData();
            const referralReward = calculateReferralReward(usdtValue);
            const referredUser = referralData[useAccountAddress];
            if (referredUser && referredUser.referrer_address) {
                const referrerAddress = referredUser.referrer_address;
                referralData[referrerAddress].rewards += referralReward;
                referralData[referrerAddress].referral_count++;
                await updateReferralData(referralData);
            }
        } catch (error) {
            console.error('Error handling referral reward:', error);
        }
    };

    const generateReferralLink = (address) => {
        return `http://localhost:3000/?ref=${address}`;
    };

    const calculateReferralReward = (amount) => {
        return amount * 0.05; // Assuming referral reward is 5% of the amount
    };

    return null;
}
