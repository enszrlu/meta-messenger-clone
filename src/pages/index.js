import Head from 'next/head';
import Messages from '@/components/Messages';
import Header from '../components/Header';
import ChatInput from '@/components/ChatInput';
import Loading from '../components/Loading';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
    const { data } = useSWR(`${process.env.VERCEL_URL}/api/getMessages`, fetcher);

    if (!data)
        return (
            <div>
                <Head>
                    <title>Meta Messenger</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/img/meta.png" />
                </Head>
                <Header></Header>
                <Loading />
                <ChatInput></ChatInput>
            </div>
        );
    else {
        const messages = data.messages;
        return (
            <div>
                <Head>
                    <title>Meta Messenger</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/img/meta.png" />
                </Head>
                <Header></Header>
                <Messages initialMessages={messages}></Messages>
                <ChatInput></ChatInput>
            </div>
        );
    }
}
