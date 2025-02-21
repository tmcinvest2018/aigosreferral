// pages/api/purchase.js
import { createClient } from '@supabase/supabase-js';
import { isAddress } from 'ethers/lib/utils';

const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { buyerWallet, usdtAmount, refCode } = req.body;

        console.log("/api/purchase - Received:", req.body); // Log for debugging

        // Input Validation
        if (!buyerWallet || !isAddress(buyerWallet)) {
            return res.status(400).json({ error: 'Invalid buyer wallet address' });
        }
        if (typeof usdtAmount !== 'number' || usdtAmount <= 0) {
            return res.status(400).json({ error: 'Invalid USDT amount' });
        }
        if (refCode && typeof refCode !== 'string') {
            return res.status(400).json({ error: 'Invalid referral link' });
        }
        
        if (refCode) {
            // 1. Extract Referrer Wallet from Referral Link
            const referrerWallet = refCode.split('?ref=')[1]?.split('-')[0];
            if (!referrerWallet || !isAddress(referrerWallet)) {
                return res.status(400).json({ error: 'Invalid referral link format' });
            }
            const lowerCaseReferrerWallet = referrerWallet.toLowerCase(); // Convert to lowercase
            console.log("/api/purchase - Extracted Referrer Wallet:", referrerWallet);
            console.log("/api/purchase - Lowercase Referrer Wallet:", lowerCaseReferrerWallet); // ADDED LOG


            // 2. Fetch Referrer Data (Case-Insensitive)
            const { data: referrerData, error: referrerError } = await supabaseAdmin
                .from('referrals')
                .select('wallet, total_referred, total_rewards, referral_link')
                .ilike('wallet', lowerCaseReferrerWallet) // Use ilike for case-insensitive matching
                .single();



            if (referrerError && referrerError.code !== 'PGRST116') {
                console.error("Referrer fetch error:", referrerError);
                return res.status(500).json({ error: 'Error fetching referrer data', details: referrerError });
            }

            // 3. Update Referrer Rewards (if referrer exists)
            if (referrerData) {
                console.log("/api/purchase - Referrer data found:", referrerData);
                if (referrerData.wallet.toLowerCase() === buyerWallet.toLowerCase()) {
                    return res.status(400).json({ error: 'Self-referrals are not allowed' });
                }

                const reward = usdtAmount * 0.1;
                console.log(`/api/purchase - Updating rewards for referrer: ${referrerWallet}, reward: ${reward}`);

                const { error: updateError } = await supabaseAdmin.rpc('increment_referral_rewards', {
                    _referral_link: referrerData.referral_link,
                    _reward: reward,
                });

                if (updateError) {
                    console.error("Referrer update error:", updateError);
                    return res.status(500).json({ error: 'Failed to update referrer rewards', details: updateError });
                }
            } else {
                console.log(`/api/purchase - No referrer data found for refCode: ${refCode}`);
            }
        }

        return res.status(200).json({ success: true });
    }
    return res.status(405).end(); // Method Not Allowed
}