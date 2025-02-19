 // pages/api/admin/resetReferrals.js
 import { createClient } from '@supabase/supabase-js';
 import { isAddress } from 'ethers/lib/utils';
 
 const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
 
 export default async function handler(req, res) {
 if (req.method !== 'POST') {
 return res.status(405).end();
 }
 
 // *** ADMIN AUTHENTICATION *** (Replace with your actual logic)
 const isAdmin = req.headers.authorization === `Bearer ${process.env.ADMIN_API_KEY}`;
 if (!isAdmin) {
     return res.status(403).json({ error: 'Forbidden' });
 }
 
 const { wallet } = req.body;
 if (!wallet || !isAddress(wallet)) {
       return res.status(400).json({ error: 'Invalid wallet address' });
 }
 
 try {
     const { error } = await supabaseAdmin
         .from('referrals')
         .update({ total_rewards: 0 })
         .eq('wallet', wallet);
 
     if (error) {
         console.error("Reset error:", error);
         return res.status(500).json({ error: 'Failed to reset referrals', details: error });
     }
 
     return res.status(200).json({ success: true });
 } catch (error) {
     console.error("Unexpected error:", error);
     return res.status(500).json({ error: 'An unexpected error occurred' });
 }
  
 }