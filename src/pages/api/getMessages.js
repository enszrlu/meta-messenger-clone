// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import redis from '../../../redis';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const messagesRes = await redis.hvals('messages');

    const messages = messagesRes
        .map((message) => JSON.parse(message))
        .sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json({ messages });
}
