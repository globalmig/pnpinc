import React from "react";

type LocationProp = {
  name: string;
  locationTitle?: string; // "매장 위치" 같은 서브 타이틀
  address: string; // 줄바꿈 포함 가능
  phone: string;
  link: string;
};

export default function LocationCard({ name, locationTitle = "매장 위치", address, phone, link }: LocationProp) {
  return (
    <div className="w-full max-w-[360px] bg-white rounded-2xl border-2 border-black/20 shadow-[0_0_0_2px_rgba(0,0,0,0.15)] p-8">
      {/* ✅ 텍스트 래퍼에 w-full + text-center */}
      <div className="w-full text-center">
        <h2 className="text-3xl font-extrabold tracking-tight">{name}</h2>
        {/* <h3 className="mt-2 text-xl font-extrabold">{locationTitle}</h3> */}

        <p className="mt-2 text-black/70 leading-relaxed whitespace-pre-line">{address}</p>

        <p className="mt-2 text-black/70">{phone}</p>
      </div>

      <a href={link} className="mt-8 block w-full rounded-xl bg-red-600 py-4 text-center text-xl font-extrabold text-white">
        자세히보기
      </a>
    </div>
  );
}
