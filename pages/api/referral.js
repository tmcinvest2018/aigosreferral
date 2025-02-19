// pages/api/referral.js
import { createClient } from '@supabase/supabase-js';
import { isAddress } from 'ethers/lib/utils';
import jwt from 'jsonwebtoken';

const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function generateReferralCode() {
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let code;
let isUnique = false;

while (!isUnique) {
    code = '';
    for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const { data, error } = await supabaseAdmin
        .from('referrals')
        .select('referral_code')
        .eq('referral_code', code)
        .single();

    if (error) {
        console.error("Error checking referral code uniqueness:", error);
        throw new Error("Failed to check referral code uniqueness");
    }

    isUnique = !data;
}
return code;

}

export default async function handler(req, res) {
if (req.method === 'GET') {
const authHeader = req.headers.authorization;
if (!authHeader || !authHeader.startsWith('Bearer ')) {
return res.status(401).json({ error: 'Unauthorized' });
}
const token = authHeader.split(' ')[1];

try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const wallet = decoded.wallet;

        if (!wallet || !isAddress(wallet)) {
            return res.status(400).json({ error: 'Invalid wallet address' });
        }

        const { data, error } = await supabaseAdmin
            .from('referrals')
            .select('*')
            .eq('wallet', wallet)
            .single();

        if (error) return res.status(500).json({ error: 'Database error', details: error });

        if (!data) {
            const referralCode = await generateReferralCode();
            const referralLink = `${process.env.NEXT_PUBLIC_APP_URL}?ref=${referralCode}`;

            const { data: newUser, error: insertError } = await supabaseAdmin
                .from('referrals')
                .insert([
                    { wallet, referral_link: referralLink, referral_code: referralCode, total_referred: 0, total_rewards: 0 },
                ])
                .single();

            if (insertError) return res.status(500).json({ error: 'Insert error', details: insertError });
            return res.status(200).json(newUser);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Referral fetch error:", error);
        return res.status(401).json({ error: 'Invalid token' });
    }
}
return res.status(405).end();

}