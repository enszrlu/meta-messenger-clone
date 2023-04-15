import React, { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../../utils/fetchMessages';
import Message from './Message';
import { clientPusher } from '../../pusher';

function Messages({ initialMessages }) {
    const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);

    useEffect(() => {
        const channel = clientPusher.subscribe('messages');
        channel.bind('new-message', async (data) => {
            if (messages.find((message) => message.id === data.id)) return;
            if (!messages) {
                mutate(fetcher);
            } else {
                mutate(fetcher, { optimisticData: [data, ...messages], rollbackOnError: true });
            }
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages, mutate, clientPusher]);
    return (
        <div className="space-y-4 p-4 overflow-y-scroll max-w-2xl xl:max-w-4xl mx-auto">
            {(messages || initialMessages).map((message) => (
                <Message message={message} key={message.id}></Message>
            ))}
        </div>
    );
}

export default Messages;
