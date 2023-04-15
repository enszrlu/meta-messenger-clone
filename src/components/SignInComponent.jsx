import React from 'react';
import { signIn } from 'next-auth/react';

function SignInComponent({ providers }) {
    return (
        <div>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        className="bg-blue-500 p-3 rounded-lg text-white"
                        onClick={() =>
                            signIn(provider.id, {
                                callbackUrl: process.env.VERCEL_URL || 'http://localhost:3000'
                            })
                        }
                    >
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default SignInComponent;
