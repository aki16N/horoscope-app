"use client"

import { signIn, ClientSafeProvider } from "next-auth/react"
import { Button } from "react-bootstrap"

type Props = {
    provider: ClientSafeProvider;
    callbackUrl: string;
}

export default function LoginButton({ provider, callbackUrl }: Props) {

    return (
        <>
            <Button onClick={() => signIn(provider.id, {
                callbackUrl
            })}
                className="m-2"
            >
                Sign in with {provider.name}
            </Button>
        </>
    )
}