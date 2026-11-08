"use client";
import { createRanking } from '@/actions/createRanking';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { CONFIRM_MESSAGE, ERROR_MESSAGES } from '@/lib/message';

import styles from "./MainForm.module.css";
import ZodiacCircle from './ZodiacCircle';
import StarField from './StarField';
import { updateRanking } from '@/actions/updateRanking';

type MainFormProps = {
  todayRanking: {
    id: number;
    createdAt: Date;
    userId: string;
    score: number;
  } | null,
  zodiacSignOfUser: string | null
}

const zodiacSigns = [
  "♈",
  "♉",
  "♊",
  "♋",
  "♌",
  "♍",
  "♎",
  "♏",
  "♐",
  "♑",
  "♒",
  "♓",
];

export default function MainForm({ todayRanking, zodiacSignOfUser }: MainFormProps) {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zodiacSign, setZodiacSign] = useState(zodiacSignOfUser ?? "");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSliding(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex]);

  const handleAnimationEnd = () => {
    // 次の星座へ
    setCurrentIndex(
      (prev) => (prev + 1) % zodiacSigns.length
    );

    // 中央で再び停止
    setIsSliding(false);
  };

  const changeStarSign = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setZodiacSign(e.target.value);
    setIsError(false);
  }

  const getFortune = async () => {
    try {
      setIsLoading(true);
      if (zodiacSign == "") {
        setIsError(true);
        return;
      }

      // ユーザーが本日、占いを行っていなかったら占い、占っていたら結果ページを表示する
      // または、占っていても星座が変更されていたら占う
      let rankingResult;
      if (todayRanking) {
        if (zodiacSign === zodiacSignOfUser) {
          // 結果ページへ遷移
          router.push(`/HoroscopeResult?rankId=${todayRanking.id.toString()}`);
          return;
        } else {
          if (confirm(CONFIRM_MESSAGE.CREATE_FORTUNE_AGAIN)) {
            rankingResult = await updateRanking(todayRanking.id, zodiacSign);
          }
        }
      } else {
        rankingResult = await createRanking(zodiacSign);
      }

      // 結果ページへ遷移
      if (rankingResult?.success) {
        router.push(`/HoroscopeResult?rankId=${rankingResult.rankId.toString()}`);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED_ERROR);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={styles.main}>
      <StarField />
      <ZodiacCircle />

      <Container className={styles.container}>
        <div className={styles.card}>
          <div className={styles.zodiacIcon}>
            {/* 現在の星座 */}
            <span
              className={`${styles.zodiac} ${isSliding ? styles.zodiacExit : ""
                }`}
              onAnimationEnd={handleAnimationEnd}
            >
              {zodiacSigns[currentIndex]}
            </span>
            {/* 次の星座 */}
            {isSliding && (
              <span
                className={`${styles.zodiac} ${styles.zodiacEnter}`}
              >
                {
                  zodiacSigns[
                  (currentIndex + 1) %
                  zodiacSigns.length
                  ]
                }
              </span>
            )}

          </div>
          <p className={styles.subtitle}>
            ✦ 今日の運勢 ✦
          </p>
          <h1 className={styles.title}>
            統計的<span><br></br></span>星座占い
          </h1>
          <div className={styles.divider}>
            ✦ ───── ✦
          </div>
          <p className={styles.description}>
            あなたの今日の運勢を占います
          </p>
          <Form.Group controlId="starSignSelect" className="mt-3">
            <Form.Label>星座</Form.Label>
            <Form.Select onChange={changeStarSign} value={zodiacSign} isInvalid={isError} aria-label="select starsign">
              <option value="">選択してください</option>
              <option value="aries">おひつじ座</option>
              <option value="taurus">おうし座</option>
              <option value="gemini">ふたご座</option>
              <option value="cancer">かに座</option>
              <option value="leo">しし座</option>
              <option value="virgo">おとめ座</option>
              <option value="libra">てんびん座</option>
              <option value="scorpius">さそり座</option>
              <option value="sagittarius">いて座</option>
              <option value="capricornus">やぎ座</option>
              <option value="aquarius">みずがめ座</option>
              <option value="pisces">うお座</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              星座を選択してください
            </Form.Control.Feedback>
          </Form.Group>
          {error && (
            <Alert variant="danger" className="mt-3" role="alert" style={{ whiteSpace: "pre-line" }}>
              {error}
            </Alert>
          )}
          <Button className={styles.button} onClick={getFortune} disabled={isLoading}>
            {todayRanking ? "✨ 占い結果 ✨" : "✨ 占う ✨"}
          </Button>
        </div>

        {/* ボタン押下処理中のみ表示 */}
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingContent}>

              <svg
                className={styles.magicSquare}
                viewBox="0 0 200 200"
              >
                {/* 外側の方陣 */}
                <circle
                  cx="100"
                  cy="100"
                  r="75"
                  fill="none"
                  stroke="#ffd86b"
                  strokeWidth="2"
                />

                {/* 内側の方陣 */}
                <rect
                  x="50"
                  y="50"
                  width="100"
                  height="100"
                  fill="none"
                  stroke="#ffd86b"
                  strokeWidth="1.5"
                />

                {/* 対角線 */}
                <line
                  x1="50"
                  y1="50"
                  x2="150"
                  y2="150"
                  stroke="#ffd86b"
                  strokeWidth="1"
                />

                <line
                  x1="150"
                  y1="50"
                  x2="50"
                  y2="150"
                  stroke="#ffd86b"
                  strokeWidth="1"
                />

                {/* 中央の円 */}
                <circle
                  cx="100"
                  cy="100"
                  r="15"
                  fill="none"
                  stroke="#ffd86b"
                  strokeWidth="1.5"
                />

                {/* 中央の星 */}
                <polygon
                  points={createStarPoints(
                    100,
                    100,
                    10,
                    4
                  )}
                  fill="#ffd86b"
                />
              </svg>

              <p className={styles.loadingText}>
                運勢を占っています...
              </p>

            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

const createStarPoints = (cx: number, cy: number, outerRadius: number, innerRadius: number) => {
  const points: string[] = [];

  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + (Math.PI * i) / 5;

    const radius =
      i % 2 === 0
        ? outerRadius
        : innerRadius;

    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;

    points.push(`${x},${y}`);
  }

  return points.join(" ");
};