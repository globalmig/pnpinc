"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Hero2 from "@/components/common/Hero2";
import Contact from "@/components/common/Contact";
import Card from "@/components/location/Card";

interface Branch {
  id: string;
  name: string;
  location: string;
  phone: string;
  map_link: string;
  created_at: string;
}

export default function LocationPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch("/api/admin/branches");
      if (response.ok) {
        const data = await response.json();
        setBranches(data);
      } else {
        console.error("지점 정보를 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black">
      <Hero2 bg="/images/menus_bg.png" title="마시마니" highlightText="매장소개" title2="" description="전국 지점 정보를 한눈에 " description2="확인하세요" />

      <div className="w-full mx-auto">
        <div className="relative w-full h-40 overflow-hidden rounded-t-xl">
          <Image src="/images/top_Image.png" alt="지붕" fill className="object-cover" priority />
        </div>
      </div>

      <section>
        <div className="flex justify-center items-center gap-10">
          <Image src={"/images/main_logo.png"} alt="마시마니 로고" width={200} height={200} />
          <h2 className="text-red-500 text-5xl">신규 매장</h2>
        </div>

        <div className="cardList max-w-[1440px] mx-auto">
          {loading ? (
            <div className="my-14 flex justify-center items-center min-h-[300px]">
              <div className="text-white text-lg">로딩 중...</div>
            </div>
          ) : branches.length === 0 ? (
            <div className="my-14 flex justify-center items-center min-h-[300px]">
              <div className="text-white text-lg">등록된 지점이 없습니다.</div>
            </div>
          ) : (
            <div className="my-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {branches.map((branch) => (
                <Card key={branch.id} name={branch.name} locationTitle={branch.name} phone={branch.phone} link={branch.map_link} address={branch.location} />
              ))}
            </div>
          )}
        </div>

        <Contact />
      </section>
    </div>
  );
}
