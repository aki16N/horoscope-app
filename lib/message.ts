export const ERROR_MESSAGES = {
    // DB系
    DATABASE_CONNECTION_FAILED: "現在サービスに接続できません。\nしばらく時間をおいてから再度お試しください。",
    USER_CREATE_FAILED: "ユーザーの作成に失敗しました。",
    USER_NOT_FOUND: "ユーザーが見つかりませんでした。",
    GUEST_USER_NOT_FOUND: "ゲストユーザーが見つかりませんでした。",
    DUPLICATE_DATA: "入力された情報は既に登録されています。",
    DATA_NOT_FOUND: "対象のデータが見つかりませんでした。\n更新してもう一度お試しください。",
    DATABASE_ERROR: "処理中にエラーが発生しました。\nしばらく時間をおいてから再度お試しください。",

    UNEXPECTED_ERROR: "予期しないエラーが発生しました。",
} as const;

export const CONFIRM_MESSAGE = {
    CREATE_FORTUNE_AGAIN: "星座が変更されています。\n再度占うと前回の結果は失われますが、もう一度占いますか？",
} as const;