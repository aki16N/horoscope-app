"use client";

import styles from "./HoroscopeResult.module.css";
import { AverageRanking } from '@/types/ranking';
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

type Props = {
    myRank: number
    zodiacSign: string | null
    averageRankings: AverageRanking[]
}

type RankedAverageRanking = AverageRanking & {
    rank: number;
}

export default function HoroscopeResult({ myRank, zodiacSign, averageRankings }: Props) {
    const commonRanking = createCommonRanking(averageRankings);

    const getPyramidSvgPosition = (rank: number, myAverageRank: number) => {
        const pyramidTop = 20;
        const pyramidHeight = 360;
        const averageRankTop = ((myAverageRank - 1) / 12) * pyramidHeight;

        return pyramidTop + averageRankTop + (rank - 1) * pyramidHeight / 12 / 12;
    };

    const createStarPoints = (
        cx: number,
        cy: number,
        outerRadius: number,
        innerRadius: number
    ) => {
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

    // 自分の星座の平均順位
    const myAverage = commonRanking.find(
        (ranking) => ranking.zodiacSign === zodiacSign
    );

    return (
        <section className={styles.resultMain}>
            <header className={styles.titleArea}>
                <h3 className="text-center mb-2">
                    今日の運勢
                </h3>
            </header>

            <section className={styles.resultBody}>
                {myAverage ? (
                    <>
                        <section className={styles.resultBar}>
                            <div className={styles.rankingPyramid}>

                                {/* ピラミッド */}
                                <div className={styles.pyramid}>
                                    <svg
                                        viewBox="-40 0 400 400"
                                        className={styles.pyramidSvg}
                                    >
                                        <defs>
                                            {/* ピラミッドのグラデーション */}
                                            <linearGradient
                                                id="pyramidGradient"
                                                x1="0%"
                                                y1="0%"
                                                x2="0%"
                                                y2="100%"
                                            >
                                                <stop
                                                    offset="0%"
                                                    stopColor="#ff3324"
                                                />
                                                <stop
                                                    offset="35%"
                                                    stopColor="#ffc107"
                                                />
                                                <stop
                                                    offset="65%"
                                                    stopColor="#38ff31"
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor="#2735b9"
                                                />
                                            </linearGradient>
                                        </defs>

                                        {/* ピラミッド本体 */}
                                        <polygon
                                            points="160,20 330,380 -10,380"
                                            fill="url(#pyramidGradient)"
                                            stroke="#ffffff"
                                            strokeWidth="4"
                                            strokeLinejoin="round"
                                        />

                                        {/* 11本の順位区切り線 */}
                                        {Array.from({ length: 11 }, (_, i) => {
                                            const rank = i + 1;

                                            // ピラミッド上のY座標
                                            const y = 20 + (360 * rank) / 12;

                                            // ピラミッドの斜辺に合わせてX座標を計算
                                            const halfWidth = (170 * rank) / 12;

                                            const leftX = 160 - halfWidth;
                                            const rightX = 160 + halfWidth;

                                            return (
                                                <line
                                                    key={rank}
                                                    x1={leftX}
                                                    y1={y}
                                                    x2={rightX}
                                                    y2={y}
                                                    stroke="rgba(255, 255, 255, 0.75)"
                                                    strokeWidth="1.5"
                                                />
                                            );
                                        })}

                                        {/* あなたのマーカー */}
                                        <polygon
                                            points={createStarPoints(
                                                160,
                                                getPyramidSvgPosition(myRank, myAverage.rank),
                                                9,
                                                4
                                            )}
                                            fill="#ffc107"
                                            stroke="#ffffff"
                                            strokeWidth="2"
                                        />
                                        {/* あなたのラベル */}
                                        <text
                                            x="175"
                                            y={getPyramidSvgPosition(myRank, myAverage.rank)}
                                            textAnchor="start"
                                            dominantBaseline="middle"
                                            fill="#ffffff"
                                            fontSize="14"
                                            fontWeight="bold"
                                            stroke="#000000"
                                            strokeWidth="1"
                                            paintOrder="stroke"
                                        >
                                            あなた
                                        </text>

                                        {/* 順位 */}
                                        {Array.from({ length: 12 }, (_, i) => {
                                            const rank = i + 1;

                                            // 順位ごとのY座標
                                            const y =
                                                20 +
                                                (360 * (rank - 0.5)) / 12;

                                            // ピラミッド左斜辺上のX座標
                                            const pyramidX =
                                                160 -
                                                (170 * (y - 20)) / 360;

                                            // 斜辺から左側へ少し離す
                                            const x = pyramidX - 18;

                                            return (
                                                <text
                                                    key={rank}
                                                    x={x}
                                                    y={y}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    fill="#ffffff"
                                                    fontSize="14"
                                                    fontWeight="bold"
                                                >
                                                    {rank}
                                                </text>
                                            );
                                        })}
                                    </svg>
                                </div>
                            </div>
                        </section>

                        <section className={styles.averageMyRank}>
                            <Card className="bg-light mb-4">
                                <Card.Body>
                                    <div className="d-flex justify-content-around text-center">
                                        <div>
                                            <h6>{translateZodiacSign(zodiacSign)}の順位</h6>
                                            <h3>{myAverage.rank}位</h3>
                                        </div>

                                        <div>
                                            <h6>あなたの順位</h6>
                                            <h3>{myRank}位</h3>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </section>
                    </>
                ) : (
                    <p className="text-center">
                        平均データがありません。
                    </p>
                )}

                <hr className="my-5" />

                <section className={styles.averageRank}>
                    <h4 className="mb-4 text-center">
                        🌟 星座別 平均順位ランキング
                    </h4>

                    <Table hover responsive className={styles.rankingTable}>
                        <thead>
                            <tr>
                                <th>順位</th>
                                <th>星座</th>
                                <th>平均順位</th>
                                <th>件数</th>
                            </tr>
                        </thead>

                        <tbody>
                            {commonRanking.map((ranking, i) => (
                                <tr
                                    key={ranking.zodiacSign}
                                    className={
                                        ranking.zodiacSign === zodiacSign
                                            ? "table-warning"
                                            : ""
                                    }
                                >
                                    <td>
                                        {ranking.rank === 1 && "🥇"}
                                        {ranking.rank === 2 && "🥈"}
                                        {ranking.rank === 3 && "🥉"}
                                        {ranking.rank >= 4 && ranking.rank}
                                    </td>

                                    <td>
                                        {translateZodiacSign(ranking.zodiacSign)}

                                        {ranking.zodiacSign === zodiacSign && (
                                            <Badge bg="primary" className="ms-2">
                                                あなた
                                            </Badge>
                                        )}
                                    </td>

                                    <td>{Math.round(averageRankings[i].averageScore * 1000) / 1000}位</td>

                                    <td>{ranking.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </section>
            </section>
        </section>
    );
}

function createCommonRanking(averageRankings: AverageRanking[]): RankedAverageRanking[] {
    const sortedRankings = [...averageRankings].sort(
        (a, b) => a.averageScore - b.averageScore
    );

    const commonRanking: RankedAverageRanking[] = [];
    let currentRank = 1;

    for (let i = 0; i < sortedRankings.length; i++) {
        if (i > 0 && sortedRankings[i].averageScore !== sortedRankings[i - 1].averageScore) {
            currentRank = i + 1;
        }

        commonRanking.push({
            ...sortedRankings[i],
            rank: currentRank,
        });
    }

    return commonRanking;
}

function translateZodiacSign(zodiacSign: string | null): string {
    switch (zodiacSign) {
        case "aries":
            zodiacSign = "おひつじ座";
            break;
        case "taurus":
            zodiacSign = "おうし座";
            break;
        case "gemini":
            zodiacSign = "ふたご座";
            break;
        case "cancer":
            zodiacSign = "かに座";
            break;
        case "leo":
            zodiacSign = "しし座";
            break;
        case "virgo":
            zodiacSign = "おとめ座";
            break;
        case "libra":
            zodiacSign = "てんびん座";
            break;
        case "scorpius":
            zodiacSign = "さそり座";
            break;
        case "sagittarius":
            zodiacSign = "いて座";
            break;
        case "capricornus":
            zodiacSign = "やぎ座";
            break;
        case "aquarius":
            zodiacSign = "みずがめ座";
            break;
        case "pisces":
            zodiacSign = "うお座";
            break;
        default:
            zodiacSign = ""
            break;
    }
    return zodiacSign;
}