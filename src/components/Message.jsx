import Image from 'next/image';
import React from 'react';
import { useSession } from 'next-auth/react';
import TimeAgo from 'react-timeago';

function Message({ message }) {
    const { data: session } = useSession();
    const isUser = session && session.user.email === message.email;

    return (
        <div className={`flex w-fit ${isUser && 'ml-auto'}`}>
            <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
                <Image
                    className="rounded-full mx-2"
                    src={message.profilePic}
                    width={50}
                    height={50}
                    alt="Profile Pic"
                ></Image>
            </div>
            <div>
                <p
                    className={`text-[0.65rem] px-[2px] pb-[2px]  ${
                        isUser ? 'text-blue-400 text-right' : 'text-red-400'
                    }`}
                >
                    {message.username}
                </p>
                <div className="flex items-end">
                    <div
                        className={`px-3 py-2 rounded-lg w-fit text-white ${
                            isUser ? 'bg-blue-400 ' : 'bg-red-400'
                        }`}
                    >
                        <p>{message.message}</p>
                    </div>
                    <p
                        className={`text-[0.65rem] italic px-2 text-gray-300 ${
                            isUser && '-order-2 text-right'
                        }`}
                    >
                        <TimeAgo date={message.createdAt} />
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Message;
