// pages/api/auth.js
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
if (req.method === 'POST') {
const { address, signature } = req.body;
const message = "Sign this message to access your referral dashboard on [Your dApp Name]."; // IMPORTANT: Use your message!

try {
        const recoveredAddress = recoverPersonalSignature({
            data: bufferToHex(Buffer.from(message, 'utf8')),
            sig: signature,
        });

        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            return res.status(401).json({ error: 'Invalid signature' });
        }

        // Create JWT
        const claims = { wallet: address };
        const token = jwt.sign(claims, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
return res.status(405).end(); // Method Not Allowed 
}