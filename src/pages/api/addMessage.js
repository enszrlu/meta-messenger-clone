// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import redis from '../../../redis';
import { serverPusher } from '../../../pusher';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const { message } = req.body;

    const newMessage = {
        ...message,
        createdAt: Date.now()
    };

    await redis.hset('messages', message.id, JSON.stringify(newMessage));
    serverPusher.trigger('messages', 'new-message', newMessage);

    res.status(200).json({ message: newMessage });
}
