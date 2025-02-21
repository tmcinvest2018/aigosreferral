// pages/api/referral.js
import { createClient } from '@supabase/supabase-js';
import { isAddress } from 'ethers/lib/utils';
import jwt from 'jsonwebtoken';

const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function generateReferralLink(wallet) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code;
    let referralLink; // Declare referralLink *outside* the loop
    let isUnique = false;

    while (!isUnique) {
        code = '';
        for (let i = 0; i < 8; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        referralLink = `${process.env.NEXT_PUBLIC_APP_URL}?ref=${wallet.toLowerCase()}-${code}`; // Use wallet + code

        const { data, error } = await supabaseAdmin
            .from('referrals')
            .select('referral_link')
            .eq('referral_link', referralLink)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error("Error checking referral link uniqueness:", error);
            throw new Error("Failed to check referral link uniqueness");
        }

        if (!data) {
            isUnique = true;
        } else {
            // No need to redefine referralLink here.
            console.log("Referral link not unique, generating a new one..."); // Add a log
        }
    }
    return referralLink;
}

export default async function handler(req, res) {
    console.log("/api/referral handler called");
    if (req.method === 'GET') {
        const authHeader = req.headers.authorization;
        console.log("/api/referral - Received headers:", req.headers);

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("/api/referral - No auth header")
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];
		console.log("/api/referral - token:", token);

        try {
            console.log("JWT_SECRET in /api/referral:", process.env.JWT_SECRET); // Keep this log
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const wallet = decoded.wallet;
            console.log("/api/referral: Decoded wallet:", wallet);

            if (!wallet || !isAddress(wallet)) {
                return res.status(400).json({ error: 'Invalid wallet address' });
            }

            const { data, error } = await supabaseAdmin
                .from('referrals')
                .select('*')
                .eq('wallet', wallet)
                .single();

            console.log("/api/referral: Supabase data:", data);
            console.log("/api/referral: Supabase error:", error);


            if (error) {
                if (error.code === 'PGRST116') {
                    console.log("/api/referral: No existing data, creating new entry.");
                    const referralLink = await generateReferralLink(wallet); // Generate the full link

                    const { data: newUser, error: insertError } = await supabaseAdmin
                        .from('referrals')
                        .insert([
                            { wallet, referral_link: referralLink, total_referred: 0, total_rewards: 0 },
                        ])
                        .select()
                        .single();

                    if (insertError) {
                        console.error("Insert error:", insertError);
                        return res.status(500).json({ error: 'Insert error', details: insertError });
                    }
                    console.log("/api/referral: New user data:", newUser);
                    return res.status(200).json(newUser);
                } else {
                    console.error("Database error:", error);
                    return res.status(500).json({ error: 'Database error', details: error });
                }
            }
            console.log("/api/referral - Returning data:", data);
            return res.status(200).json(data);

        } catch (error) {
            console.error("Referral fetch error:", error); // Keep this log
            // Specifically check for JWT errors
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                console.error("JWT Verification Error:", error.message); // Log JWT error details
                return res.status(401).json({ error: 'Invalid token' });
            }
            return res.status(401).json({ error: 'Invalid token' }); // Fallback
        }
    }
    return res.status(405).end(); // Method Not Allowed
}