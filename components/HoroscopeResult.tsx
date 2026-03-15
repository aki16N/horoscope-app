"use client";

type Props = {
    rank: number
}

export default function HoroscopeResult({rank}:Props) {
    

    return(
        <>
            <h1>{rank}位の結果ページです</h1>
        </>
    )
}