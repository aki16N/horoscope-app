import Login from "@/components/Login";
import { getProviders } from "next-auth/react";
import { notFound } from "next/navigation";

type LoginPageProps = {
    searchParams: Promise<{
        callbackUrl?: string;
    }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps){
    notFound();
    const providers = await getProviders();
    const params = await searchParams;
    const callbackUrl = params.callbackUrl ?? "/";

    return(
        <>
            <Login providers={providers} callbackUrl={callbackUrl}/>
        </>
    );
}