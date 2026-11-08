"use client";

export default function Error({ error, reset}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>エラーが発生しました。</h2>

      <p>
        処理中に問題が発生しました。
        時間をおいて再度お試しください。
      </p>

      <button onClick={() => reset()}>
        再試行
      </button>
    </div>
  );
}