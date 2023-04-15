import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const serverPusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'eu',
    useTLS: true
});

export const clientPusher = new ClientPusher('4635393f7665ad6bf741', {
    cluster: 'eu',
    forceTLS: true
});
