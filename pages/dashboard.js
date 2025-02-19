// pages/dashboard.js
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { formatUnits } from 'ethers/lib/utils';

function Dashboard() {
const { address, isConnected } = useAccount();
const [referralData, setReferralData] = useState(null);
const [agsBalance, setAgsBalance] = useState(null); // You'll need to fetch this
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
const fetchData = async () => {
  // 1. Authentication Check (using the JWT)
   const token = localStorage.getItem('your_jwt_token_key'); // Or from cookie
   if(!token) {
       // No token?  Not logged in.
       setLoading(false);
       setError("Not authenticated"); // Or redirect to a login page
       return;
   }

   if(token && address) {

    try{

        const referralResponse = await fetch('/api/referral', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!referralResponse.ok) {
            throw new Error(`Referral data fetch failed: ${referralResponse.status}`);
        }

       const referralDataResult = await referralResponse.json();
        setReferralData(referralDataResult);

        // Fetch AGS balance (using wagmi - adjust details)
        // const { data: balanceData } = useContractRead({
        //   address: process.env.NEXT_PUBLIC_AGS_TOKEN_ADDRESS, // Your token
        //   abi: agsTokenABI, // Your AGS token ABI
        //   functionName: 'balanceOf',
        //   args: [address],
        //   watch: true,
        // });

        // if (balanceData) {
        //   setAgsBalance(formatUnits(balanceData, 18));
        // }
      setLoading(false)

    } catch(err) {
       setError(err.message)
       setLoading(false)
    }

   } else {
       setLoading(false);
   }
};
 
if(isConnected){
fetchData();
}

}, [address, isConnected]);

if (loading) {
    return <div>Loading...</div>;
}

if (error) {
    return <div>Error: {error}</div>;
}
if(!isConnected) {
  return <div>Connect wallet.</div>;
}

return (
    <div>
        <h1>Referral Dashboard</h1>
        {referralData && (
            <>
                <p>Your Referral Link: <a href={referralData.referral_link} target="_blank" rel="noopener noreferrer">{referralData.referral_link}</a></p>
                <p>Referral Code: {referralData.referral_code}</p>
                <p>Total Referrals: {referralData.total_referred}</p>
                <p>Total Rewards (USDT): {referralData.total_rewards}</p>
            </>
        )}
        {agsBalance && (
            <p>AGS Balance: {agsBalance}</p> // Display balance
        )}
         {!referralData && (<p>No referral data found.</p>)}
    </div>
);

}

export default Dashboard;