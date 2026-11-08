"use client";

import { ClientSafeProvider, signOut, useSession } from "next-auth/react";
import { Form, Button, Card, Container } from "react-bootstrap";
import LoginButton from "@/components/LoginButton"
import Link from "next/link";

type Props = {
    providers: Record<string, ClientSafeProvider> | null;
    callbackUrl: string;
}

export default function Login({ providers, callbackUrl }: Props) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ログイン処理
        console.log("ログイン");
    };

    if (!providers) return <div>Loading...</div>

    const { data: session, status } = useSession();

    if (status == "loading") {
        if (!providers) return <div>Loading...</div>
    }

    if (status == "authenticated") {
        return (
            <>
                <p>ログイン中：{session.user?.email}</p>
                <button onClick={() => signOut({ callbackUrl })}>ログアウト</button>
            </>
        );
    }

    if (status == "unauthenticated") {
        return (
            <>
                <Container
                    className="d-flex justify-content-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div style={{ width: "100%", maxWidth: "420px" }}>
                        <h2 className="text-center my-4">ログイン</h2>
                        <Card
                            className="shadow mb-2"
                            style={{ width: "100%", maxWidth: "420px" }}
                        >
                            <Card.Body>
                                <div>
                                    {Object.values(providers).map((provider) => (
                                        <LoginButton key={provider.id} provider={provider} callbackUrl={callbackUrl} />
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                        <Card
                            className="shadow p-4"
                            style={{ width: "100%", maxWidth: "420px" }}
                        >
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>メールアドレス</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="example@example.com"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="password">
                                        <Form.Label>パスワード</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="パスワード"
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="w-100">
                                        ログイン
                                    </Button>
                                </Form>

                                <div className="text-center mt-3">
                                    <a href="/forgot-password">パスワードを忘れた方</a>
                                </div>

                                <hr />

                                <div className="text-center">
                                    <span>アカウントをお持ちでない方</span>
                                    <br />
                                    <Link href="/signup" className="btn btn-outline-primary mt-2">
                                            新規登録
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                </Container>


                {/* <div>
                    {Object.values(providers).map((provider) => (
                        <LoginButton key={provider.id} provider={provider} callbackUrl={callbackUrl} />
                    ))}
                </div> */}
            </>
        );
    }
}