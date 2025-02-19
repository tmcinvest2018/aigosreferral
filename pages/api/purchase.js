// pages/api/purchase.js
import { createClient } from '@supabase/supabase-js';
import { isAddress } from 'ethers/lib/utils';

const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
if (req.method === 'POST') {
const { buyerWallet, usdtAmount, refCode } = req.body;

if (!buyerWallet || !isAddress(buyerWallet)) {
        return res.status(400).json({ error: 'Invalid buyer wallet address' });
    }
    if (typeof usdtAmount !== 'number' || usdtAmount <= 0) {
        return res.status(400).json({ error: 'Invalid USDT amount' });
    }
    if (refCode && typeof refCode !== 'string') {
        return res.status(400).json({ error: 'Invalid referral code' });
    }

    if (refCode) {
        const { data: referrerData, error: referrerError } = await supabaseAdmin
            .from('referrals')
            .select('wallet, total_referred, total_rewards')
            .eq('referral_code', refCode)
            .single();

        if (referrerError) {
            console.error("Referrer fetch error:", referrerError);
            return res.status(500).json({ error: 'Error fetching referrer data', details: referrerError });
        }

        if (referrerData) {
            if (referrerData.wallet.toLowerCase() === buyerWallet.toLowerCase()) {
                return res.status(400).json({ error: 'Self-referrals are not allowed' });
            }

            const reward = usdtAmount * 0.1;
            const newRewards = referrerData.total_rewards + reward;
            let attempts = 3;

            while (attempts > 0) {
                const { error: updateError } = await supabaseAdmin
                    .from('referrals')
                    .update({
                        total_referred: referrerData.total_referred + 1,
                        total_rewards: newRewards,
                    })
                    .eq('referral_code', refCode)
                    .eq('total_rewards', referrerData.total_rewards)
                    .eq('total_referred', referrerData.total_referred);

                if (updateError) {
                    console.error("Referrer update error:", updateError);
                    attempts--;
                    if (attempts === 0) {
                        return res.status(500).json({ error: 'Failed to update referrer rewards', details: updateError });
                    }
                    await new Promise(resolve => setTimeout(resolve, 200));
                } else {
                    break; // Success
                }
            }
        }
    }

    return res.status(200).json({ success: true });
}
return res.status(405).end();

}