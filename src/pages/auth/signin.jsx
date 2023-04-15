import React, { useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import SignInComponent from '../../components/SignInComponent';
import Head from 'next/head';
import Header from '../../components/Header';

function SignInPage({ providers }) {
    return (
        <>
            <Head>
                <title>Meta Messenger Signin</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/img/meta.png" />
            </Head>
            <Header></Header>
            <div className="flex flex-col justify-center items-center">
                <div>
                    <Image
                        className="rounded-full mx-2 object-cover"
                        width={700}
                        height={700}
                        src="/img/messenger.png"
                        alt="Profile Pic"
                    ></Image>
                </div>
                <SignInComponent providers={providers}></SignInComponent>
            </div>
        </>
    );
}

export default SignInPage;

export async function getServerSideProps(context) {
    return {
        props: {
            providers: await getProviders()
        }
    };
}
