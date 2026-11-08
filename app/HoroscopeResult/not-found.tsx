import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <h1>404</h1>

      <h2>ページが見つかりません</h2>

      <p>
        お探しのページは存在しないか、
        削除された可能性があります。
      </p>

      <Link href="/">
        トップページへ戻る
      </Link>
    </div>
  );
}