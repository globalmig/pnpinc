"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Hero2 from "@/components/common/Hero2";

type BrandKey = "octopus" | "goat";

const tabs: { key: BrandKey; label: string }[] = [
  { key: "octopus", label: "마시마니 문어&전복갈비찜전문점" },
  { key: "goat", label: "마시마니 흑염소요리전문점" },
];

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Page() {
  const router = useRouter();
  const params = useParams<{ brand?: string }>();

  const brand = (params.brand as BrandKey) ?? "octopus";

  function onClickTab(next: BrandKey) {
    router.push(`/masimani/${next}`);
  }

  return (
    <div className="bg-black">
      {/* HERO: 탭별로 다르게 보여주고 싶으면 여기서 분기 */}
      {brand === "octopus" && <Hero2 bg="/images/hero_bg3.png" title="마시마니는" highlightText="힘" title2="이다" description="희소성과 완성도." description2="확실한 메뉴가 매출을 만든다." />}

      {brand === "goat" && <Hero2 bg="/images/hero_bg3.png" title="마시마니는" highlightText="힘" title2="이다" description="진한 국물과 건강함." description2="단골이 생기는 맛." />}

      {/* TABS */}
      <div className="grid grid-cols-2 text-center w-full max-w-[1440px] pt-10 mx-auto">
        {tabs.map((t) => {
          const active = brand === t.key;

          return (
            <div key={t.key} className={cn("py-4 border-b-2", active ? "border-red-500" : "border-white/30")}>
              <button type="button" onClick={() => onClickTab(t.key)} className={cn("w-full", active ? "text-red-500 font-semibold" : "text-white")}>
                {t.label}
              </button>
            </div>
          );
        })}
      </div>

      {/* SECTION */}
      <div className="w-full max-w-[1440px] mx-auto py-10">
        {brand === "octopus" && (
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">문어&전복갈비찜전문점 섹션</h3>
            <p className="text-white/80">여기에 문어&전복갈비찜 컨텐츠 넣으면 됨.</p>
          </section>
        )}

        {brand === "goat" && (
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">흑염소요리전문점 섹션</h3>
            <p className="text-white/80">여기에 흑염소 컨텐츠 넣으면 됨.</p>
          </section>
        )}
      </div>
    </div>
  );
}
