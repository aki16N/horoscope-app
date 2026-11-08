import styles from "./ZodiacCircle.module.css";

const signs = [
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
    "♓"
];

export default function ZodiacCircle() {

    return (
        <div className={styles.circle}>
            {
                signs.map((sign, index) => (
                    <div
                        key={sign}
                        className={styles.sign}
                        style={{
                            transform:
                                `rotate(${index * 30}deg)
                                translateY(-250px)`
                        }}
                    >
                        {sign}
                    </div>
                ))
            }
        </div>
    );
}