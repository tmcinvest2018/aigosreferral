
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { wallet } = req.query
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('wallet', wallet)
      .single()

    if (error) return res.status(400).json({ error })
    if (!data) {
      // Generate unique referral link
      const referralLink = `${process.env.NEXT_PUBLIC_APP_URL}?ref=${wallet}`
      const { data: newUser, error: insertError } = await supabase
        .from('referrals')
        .insert([
          { wallet, referral_link: referralLink, total_referred: [], total_rewards: 0 }
        ])
        .single()

      if (insertError) return res.status(400).json({ error: insertError })
      return res.status(200).json(newUser)
    }
    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const { referrerWallet, buyerWallet, usdtAmount } = req.body
    const reward = usdtAmount * 0.1 // 10% reward

    const { data: referrer, error: fetchError } = await supabase
      .from('referrals')
      .select('*')
      .eq('wallet', referrerWallet)
      .single()

    if (fetchError) return res.status(400).json({ error: fetchError })

    const newReferred = [...referrer.total_referred, buyerWallet]
    const newRewards = referrer.total_rewards + reward

    const { data, error } = await supabase
      .from('referrals')
      .update({ 
        total_referred: newReferred,
        total_rewards: newRewards 
      })
      .eq('wallet', referrerWallet)

    if (error) return res.status(400).json({ error })
    return res.status(200).json(data)
  }
}
