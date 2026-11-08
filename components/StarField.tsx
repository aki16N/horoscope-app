"use client";

import { useEffect, useState } from "react";
import styles from "./StarField.module.css";

type Star = {
    id: number;
    left: number;
    top: number;
};

export default function StarField() {
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        const randomStars = Array.from(
            { length: 80 },
            (_, i) => ({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
            })
        );

        setStars(randomStars);
    }, []);

    return (
        <div className={styles.field}>
            {stars.map((star) => (
                <span
                    key={star.id}
                    className={styles.star}
                    style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                    }}
                />
            ))}
        </div>
    );
}