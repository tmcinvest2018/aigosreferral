// pages/dashboard.js
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { formatUnits } from 'ethers/lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useContractRead } from 'wagmi';
import presaleABI from '../contracts/presaleABI.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import
import { faLink } from "@fortawesome/free-solid-svg-icons"; // Import a link icon
import Typewriter from 'typewriter-effect';


function Dashboard() {
    const { address, isConnected } = useAccount();
    const { isAuthenticated, token, logout, checkAuth } = useAuth();
    const [referralData, setReferralData] = useState(null);
    const [agsBalance, setAgsBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const { data: vestingData, error: vestingError, isLoading: vestingIsLoading } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: presaleABI,
        functionName: "userVesting",
        args: [address, process.env.NEXT_PUBLIC_PRESALE_ID],
        watch: true,
        enabled: Boolean(address)
    });

    useEffect(() => {
        if (vestingData) {
            const totalAmount = vestingData[0];
            setAgsBalance(formatUnits(totalAmount, 18));
        }
        if (vestingError) {
            console.error("Error loading AGS Balance (Vesting Data)", vestingError);
        }
    }, [vestingData, vestingError]);

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated && token) {
                try {
                    const referralResponse = await fetch('/api/referral', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!referralResponse.ok) {
                        if (referralResponse.status === 401) {
                            logout();
                            return;
                        }
                        const errorText = await referralResponse.text();
                        throw new Error(`Referral data fetch failed: ${referralResponse.status} - ${errorText}`);
                    }

                    const referralDataResult = await referralResponse.json();
                    setReferralData(referralDataResult);

                } catch (err) {
                    console.error("Referral fetch error (caught):", err);
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        if(isConnected){
        fetchData();
        } else {
            setLoading(false);
        }

    }, [isAuthenticated, token, address, logout, router, isConnected]);

    useEffect(() => {
      if (!loading && !isAuthenticated && isConnected) {
          router.push('/');
      }
    }, [loading, isAuthenticated, isConnected, router]);


    if (loading) {
        return <div>Loading...</div>; // Keep the loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Keep the error state
    }

    if (!isConnected) {
        return <div>Connect wallet.</div>; // Keep the connect wallet message
    }


    return (
        <section className="flex items-center justify-center min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/images/bg/13.jpg')] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            <div className="text-center relative z-10">
                <div className="box-cont h-fit w-fit max-w-[90%] mx-auto px-8 sm:px-14 py-8 shadow-lg bg-gradient-to-r from-neutral-900/90 to-neutral-800/90 rounded-xl border border-neutral-700">
                   <h2 className="text-white font-bold text-3xl md:text-4xl mb-4">
                      Referral Dashboard
                    </h2>
                    <h4 className="text-white font-bold text-xl md:text-2xl mb-6">
                        <Typewriter
                            options={{
                                strings: ["Your", "Personal", "Dashboard"],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </h4>
                    {referralData ? (
                        <div className="space-y-4 text-white text-left">
                            <p className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faLink} className="text-blue-500" />
                                <span>Your Referral Link:</span> <a href={referralData.referral_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">{referralData.referral_link}</a>
                            </p>
                            <p>
                                Total Referrals: <span className="font-semibold">{referralData.total_referred}</span>
                            </p>
                            <p>
                                Total Rewards (USDT): <span className="font-semibold">{referralData.total_rewards.toFixed(2)}</span>
                            </p>
                            {agsBalance && !vestingIsLoading && (
                                <p>
                                    AGS Balance (Vested): <span className="font-semibold">{agsBalance}</span>
                                </p>
                            )}
                        </div>
                    ) : (
                        <p className="text-white">No referral data found.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Dashboard;