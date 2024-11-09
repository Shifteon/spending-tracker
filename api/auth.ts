import type { VercelRequest, VercelResponse } from '@vercel/node';

import { createToken, verifyPassword } from '../lib/util/auth.js'; // it will be js after compilation

export default async function auth(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") return;

    const password: string = req.body.password;

    if (!verifyPassword(password)) {
        res.status(404).json({message: "Password is incorrect"});
        return;
    }

    const token = await createToken();

    if (token) {
        res.status(200).json({ message: "Authorized", token: token });
    } else {
        res.status(500).json({ message: "Failed to generate token" });
    }

}