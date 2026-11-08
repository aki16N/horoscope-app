export function getJapanTodayRange() {
    const now = new Date();

    const formatter = new Intl.DateTimeFormat(
        "ja-JP",
        {
            timeZone: "Asia/Tokyo",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }
    );

    const parts = formatter.formatToParts(now);
    const year = Number(
        parts.find(p => p.type === "year")?.value
    );
    const month = Number(
        parts.find(p => p.type === "month")?.value
    );
    const day = Number(
        parts.find(p => p.type === "day")?.value
    );

    const startOfToday = new Date(
        Date.UTC(
            year,
            month - 1,
            day,
            -9
        )
    );

    const startOfTommorow = new Date(
        startOfToday.getTime() + 24 * 60 * 60 * 1000
    );

    return {
        startOfToday,
        startOfTommorow,
    };
}