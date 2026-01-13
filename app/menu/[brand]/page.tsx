"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Hero2 from "@/components/common/Hero2";
import Image from "next/image";
import Contact from "@/components/common/Contact";
import MenuFeature from "@/components/menu/MenuFeature";

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
    router.push(`/menu/${next}`);
  }

  return (
    <div className="bg-black">
      {/* HERO: 탭별로 다르게 보여주고 싶으면 여기서 분기 */}
      {brand === "octopus" && <Hero2 bg="/images/menus_bg.png" title="마시마니" highlightText="메뉴소개" title2="" description="희소성과 완성도." description2="확실한 메뉴가 매출을 만든다." />}

      {brand === "goat" && (
        <Hero2
          bg="/images/menus_bg.png"
          title="마시마니"
          highlightText="
메뉴 소개"
          title2=""
          description="희소성과 완성도."
          description2="확실한 메뉴가 매출을 만든다."
        />
      )}

      <div className="w-full mx-auto  ">
        <div className="relative w-full  h-40 overflow-hidden rounded-t-xl">
          <Image src="/images/top_Image.png" alt="지붕" fill className="object-cover" priority />
        </div>
      </div>

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
      <div className="w-full max-w-[1440px] mx-auto py-10 text-white">
        {brand === "octopus" && (
          <section>
            <MenuFeature
              title="전복갈비찜"
              imageSrc="/images/item01.png"
              imageAlt="전복갈비찜"
              imagePosition="left"
              description={
                <>
                  전복의 깊은 풍미와 부드러운 갈비가
                  <br className="hidden md:block" />
                  어우러진 보양 갈비찜.
                </>
              }
            />
            <MenuFeature title="전복보쌈" imageSrc="/images/item02.png" imageAlt="전복보쌈" imagePosition="right" description={<>부드러운 보쌈에 쫄깃한 전복을 더한 고급 보양 한상.</>} />

            <MenuFeature title="전복회" imageSrc="/images/item03.png" imageAlt="전복회" imagePosition="left" description={<>신선한 전복을 그대로 즐기는 쫄깃한 바다의 풍미.</>} />

            <MenuFeature
              title="해신탕"
              imageSrc="/images/item04.png"
              imageAlt="해신탕"
              imagePosition="right"
              description={
                <>
                  전복·해산물을 푸짐하게 담아 진하게
                  <br className="hidden md:block" />
                  끓여낸 바다 보양탕
                </>
              }
            />

            <MenuFeature title="전복삼계탕뚝배기" imageSrc="/images/item05.png" imageAlt="전복삼계탕뚝배기" imagePosition="left" description={<>전복을 더해 깊고 진한 국물의 든든한 보양 삼계탕</>} />

            <MenuFeature title="전복산합구이" imageSrc="/images/item06.png" imageAlt="전복산합구이" imagePosition="right" description={<>전복과 해산물을 불향 가득 구워낸 고급 바다 한 접시</>} />

            <Contact />
          </section>
        )}

        {brand === "goat" && (
          <section>
            <MenuFeature
              title="흑염소 수육"
              imageSrc="/images/item07.png"
              imageAlt="흑염소 수육"
              imagePosition="left"
              description={
                <>
                  전잡내 없이 삶아낸 흑염소 고기를 담백하게 즐기는 <br className="hidden md:block" />
                  깊은 맛의 보양 수육
                </>
              }
            />
            <MenuFeature
              title="흑염소 해장탕"
              imageSrc="/images/item08.png"
              imageAlt="흑염소 해장탕"
              imagePosition="right"
              description={
                <>
                  깊고 진한 흑염소 육수로 해장과 기력을 <br className="hidden md:block" />
                  동시에 챙길 수있는 얼큰한 탕
                </>
              }
            />

            <MenuFeature
              title="흑염소 무침"
              imageSrc="/images/item09.png"
              imageAlt="흑염소 무침"
              imagePosition="left"
              description={
                <>
                  담백한 흑염소 고기에 새콤매콤한 양념을 더해 입맛을 <br className="hidden md:block" />확 살려주는 별미
                </>
              }
            />

            <MenuFeature
              title="흑염소전골"
              imageSrc="/images/item10.png"
              imageAlt="흑염소전골"
              imagePosition="right"
              description={
                <>
                  진하게 우려낸 흑염소 육수에 각종 채소를 듬뿍 넣어
                  <br className="hidden md:block" />
                  깊은 맛을 즐기는 얼큰한 전골
                </>
              }
            />
            <Contact />
          </section>
        )}
      </div>
    </div>
  );
}
