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
        <div className="text-center md:p-0  pt-56 md:absolute md:right-40 md:top-72">
          <h2 className="text-6xl">{item.title}</h2>
          <div className="flex w-full justify-center">
            <h2 className="text-6xl text-red-500 text-center">{item.highlightText}</h2>
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
