import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { useSession, signIn, signOut } from 'next-auth/react';

function Header() {
    const router = useRouter();

    const { data: session } = useSession();

    if (session) {
        return (
            <header className="sticky top-0 z-50 shadow-md bg-white flex justify-between p-10">
                <div className="flex flex-col items-center space-y-5">
                    <div className="flex space-x-2 items-center">
                        <div className="relative h-12 w-12 rounded-full">
                            <Image
                                src={session.user.image}
                                fill
                                className="object-cover rounded-full"
                                alt="Profile Picture"
                                sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw,100vw"
                            ></Image>
                        </div>
                        <div>
                            <p className="text-blue-400">Logged in as:</p>
                            <p className="font-bold text-lg">{session.user.name}</p>
                        </div>
                    </div>
                </div>
                <LogoutButton clickHandler={() => signOut()}></LogoutButton>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-50 shadow-md bg-white flex justify-center p-10">
            <div className="flex flex-col items-center space-y-5">
                <div className="flex space-x-2 items-center">
                    <div className="relative h-8 w-8">
                        <Image
                            onClick={() => router.push('/')}
                            src="/img/meta.png"
                            fill
                            className="object-fill cursor-pointer"
                            alt="Meta Logo"
                        ></Image>
                    </div>
                    <p className="text-blue-400">Welcome to Meta Messenger</p>
                </div>
                <Link
                    href="/auth/signin"
                    className="bg-blue-500  text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                    Sign In
                </Link>
            </div>
        </header>
    );
}

export default Header;
