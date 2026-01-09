import React from "react";

interface HeroProp {
  bg: string;
  title: string;
  highlightText: string;
  title2?: string;
  description: string;
  description2: string;
}

export default function Hero2(item: HeroProp) {
  return (
    <section className=" bg-cover bg-center bg-no-repeat text-white h-[800px]" style={{ backgroundImage: `url(${item.bg})` }}>
      <div className="w-full max-w-[1440px] relative mx-auto">
        <div className="absolute right-40 top-72">
          <h2 className="text-6xl">{item.title}</h2>
          <div className="flex">
            <h2 className="text-6xl text-red-500">{item.highlightText}</h2>
            {item.title2 && <h2 className="text-6xl">{item.title2}</h2>}
          </div>
          <div className="mt-4 opacity-80">
            <p className="text-2xl">{item.description}</p>
            <p className="text-2xl">{item.description2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
