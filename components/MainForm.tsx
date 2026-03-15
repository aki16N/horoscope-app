"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Container, Form, Image } from 'react-bootstrap';

export default function MainForm() {
    const router = useRouter();
    const [isError, setIsError] = useState(false);
    const [starSign, setStarSign] = useState(0);

    const changeStarSign = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStarSign(Number(e.target.value));
        setIsError(false);
    }

    const getFortune = () => {
        if (starSign == 0) {
            setIsError(true);
            return;
        }

        // 1〜12の乱数生成
        const rank = Math.floor(Math.random() * 12) + 1;
        const params = new URLSearchParams();
        params.set("rank", rank.toString());

        // 結果ページへ遷移
        router.push(`/HoroscopeResult?${params.toString()}`);
    }

    return (
        <>
            <Container>
                <Image src="/images/horoscope.png" alt="horoscopeImage" fluid />
                <Form.Group controlId="starSignSelect" className="mt-3">
                    <Form.Label>星座</Form.Label>
                    <Form.Select onChange={changeStarSign} value={starSign} isInvalid={isError} aria-label="Default select example">
                        <option value="0">選択してください</option>
                        <option value="1">おひつじ座</option>
                        <option value="2">おうし座</option>
                        <option value="3">ふたご座</option>
                        <option value="4">かに座</option>
                        <option value="5">しし座</option>
                        <option value="6">おとめ座</option>
                        <option value="7">てんびん座</option>
                        <option value="8">さそり座</option>
                        <option value="9">いて座</option>
                        <option value="10">やぎ座</option>
                        <option value="11">みずがめ座</option>
                        <option value="12">うお座</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        星座を選択してください
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" onClick={getFortune} className="mt-3">
                    今日の順位を占う
                </Button>
            </Container>
        </>
    );
}