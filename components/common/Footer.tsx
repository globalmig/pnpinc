import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] text-white/80 flex justify-center mx-auto py-20">
      <div className="text-start">
        <h4>주식회사 피앤피아이앤씨</h4>
        <p className="text-sm">
          대표자: 최명성 | 사업자 번호: 211-87-40374
          <br />
          전화 번호: 010-3712-0077
          <br />
          주소: 서울특별시 송파구 마천로 196(오금동, 201호(B03호))
        </p>
        <br />
        <Link href={"/admin"}>관리자페이지</Link>
      </div>
    </footer>
  );
}
