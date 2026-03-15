import HoroscopeResult from "@/components/HoroscopeResult";
import { redirect } from "next/navigation";
import { use } from "react";

type Props = {
  searchParams: Promise<{rank?: string}>
}

export default function RankResult({searchParams}:Props) {
  const params = use(searchParams);
  const rank = Number(params.rank);
  if(!params.rank || isNaN(rank) || rank < 1 || rank > 12){
    redirect("/");
  }

  return (
    <div>
      <HoroscopeResult rank={rank}/>
    </div>
  );
}