// "use client";

// import { Form, Button, Card, Container } from "react-bootstrap";
// import LoginButton from "./LoginButton";

// export default function LoginForm() {
//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         // ログイン処理
//         console.log("ログイン");
//     };

//     return (
//         <Container
//             className="d-flex justify-content-center align-items-center"
//             style={{ minHeight: "100vh" }}
//         >
//             <Card
//                 className="shadow p-4"
//                 style={{ width: "100%", maxWidth: "420px" }}
//             >
//                 <Card.Body>
//                     <div>
//                         {Object.values(providers).map((provider) => (
//                             <LoginButton key={provider.id} provider={provider} callbackUrl={callbackUrl} />
//                         ))}
//                     </div>
//                 </Card.Body>
//             </Card>
//             <Card
//                 className="shadow p-4"
//                 style={{ width: "100%", maxWidth: "420px" }}
//             >
//                 <Card.Body>
//                     <h2 className="text-center mb-4">ログイン</h2>

//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group className="mb-3" controlId="email">
//                             <Form.Label>メールアドレス</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 placeholder="example@example.com"
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group className="mb-4" controlId="password">
//                             <Form.Label>パスワード</Form.Label>
//                             <Form.Control
//                                 type="password"
//                                 placeholder="パスワード"
//                                 required
//                             />
//                         </Form.Group>

//                         <Button variant="primary" type="submit" className="w-100">
//                             ログイン
//                         </Button>
//                     </Form>

//                     <div className="text-center mt-3">
//                         <a href="/forgot-password">パスワードを忘れた方</a>
//                     </div>

//                     <hr />

//                     <div className="text-center">
//                         <span>アカウントをお持ちでない方</span>
//                         <br />
//                         <Button
//                             variant="outline-primary"
//                             href="/signup"
//                             className="mt-2"
//                         >
//                             新規登録
//                         </Button>
//                     </div>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// }