import React from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import useSWR from 'swr';
import fetcher from '../../utils/fetchMessages';
import { useSession } from 'next-auth/react';

function ChatInput() {
    const { data: session } = useSession();
    session && console.log(session.user);
    const [input, setInput] = useState('');
    const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);

    const addMessage = async (e) => {
        e.preventDefault();

        if (!input || !session) return;

        const messageToSend = input;

        setInput('');

        const id = uuid();

        const message = {
            id,
            message: messageToSend,
            createdAt: Date.now(),
            username: session.user.name,
            profilePic: session.user.image,
            email: session.user.email
        };

        const uploadMessage = async () => {
            const data = await fetch('/api/addMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            }).then((res) => res.json());

            return [data.message, ...messages];
        };

        await mutate(uploadMessage, {
            optimisticData: [message, ...messages],
            rollbackOnError: true
        });
    };

    return (
        <>
            <form
                onSubmit={(e) => addMessage(e)}
                className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100 bg-white"
            >
                <input
                    type="text"
                    value={input}
                    disabled={!session}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter message here..."
                    className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                    type="submit"
                    disabled={!input}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </form>
            <div className="w-full h-24"></div>
        </>
    );
}

export default ChatInput;
