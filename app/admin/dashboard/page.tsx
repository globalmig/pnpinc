"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Gallery = {
  id: string;
  title: string;
  image_links: string[];
  created_at: string;
};

type Notice = {
  id: string;
  title: string;
  description: string;
  posted_at: string;
  image_links: string[];
  created_at: string;
};

type Branch = {
  id: string;
  name: string;
  location: string;
  phone: string;
  map_link: string;
  created_at: string;
};

type TabType = "notices" | "gallery" | "branches";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("notices");
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchData();
  }, [activeTab]);

  const checkAuth = async () => {
    const response = await fetch("/api/admin/verify");
    if (!response.ok) {
      router.push("/admin");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/${activeTab}`);
      const data = await response.json();

      if (activeTab === "notices") setNotices(data);
      else if (activeTab === "gallery") setGallery(data);
      else if (activeTab === "branches") setBranches(data);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/admin/${activeTab}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
        alert("삭제되었습니다.");
      }
    } catch (error) {
      alert("삭제 실패");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">관리자 페이지</h1>
            </div>
            <div className="flex items-center">
              <button onClick={handleLogout} className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("notices")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "notices" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              공지사항
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "gallery" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              갤러리
            </button>
            <button
              onClick={() => setActiveTab("branches")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "branches" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              지점
            </button>
          </nav>
        </div>

        <div className="mb-4">
          <button onClick={() => router.push(`/admin/dashboard/create/${activeTab}`)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            + 새로 작성
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-500">로딩 중...</div>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            {activeTab === "notices" && <NoticesTable notices={notices} onDelete={handleDelete} onEdit={(id) => router.push(`/admin/dashboard/edit/notices/${id}`)} />}
            {activeTab === "gallery" && <GalleryGrid gallery={gallery} onDelete={handleDelete} onEdit={(id) => router.push(`/admin/dashboard/edit/gallery/${id}`)} />}
            {activeTab === "branches" && <BranchesTable branches={branches} onDelete={handleDelete} onEdit={(id) => router.push(`/admin/dashboard/edit/branches/${id}`)} />}
          </div>
        )}
      </div>
    </div>
  );
}

function NoticesTable({ notices, onDelete, onEdit }: { notices: Notice[]; onDelete: (id: string) => void; onEdit: (id: string) => void }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">제목</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">게시일</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">작업</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {notices.map((notice) => (
          <tr key={notice.id}>
            <td className="px-6 py-4 text-sm text-gray-900">{notice.title}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{notice.posted_at}</td>
            <td className="px-6 py-4 text-right text-sm space-x-2">
              <button onClick={() => onEdit(notice.id)} className="text-blue-600 hover:text-blue-900">
                수정
              </button>
              <button onClick={() => onDelete(notice.id)} className="text-red-600 hover:text-red-900">
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function GalleryGrid({ gallery, onDelete, onEdit }: { gallery: Gallery[]; onDelete: (id: string) => void; onEdit: (id: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {gallery.map((item) => (
        <div key={item.id} className="border rounded-lg overflow-hidden">
          {item.image_links[0] && <img src={item.image_links[0]} alt={item.title} className="w-full h-48 object-cover" />}
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
            <div className="flex justify-end space-x-2">
              <button onClick={() => onEdit(item.id)} className="text-sm text-blue-600 hover:text-blue-900">
                수정
              </button>
              <button onClick={() => onDelete(item.id)} className="text-sm text-red-600 hover:text-red-900">
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BranchesTable({ branches, onDelete, onEdit }: { branches: Branch[]; onDelete: (id: string) => void; onEdit: (id: string) => void }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">지점명</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">위치</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">연락처</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">작업</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {branches.map((branch) => (
          <tr key={branch.id}>
            <td className="px-6 py-4 text-sm text-gray-900">{branch.name}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{branch.location}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{branch.phone}</td>
            <td className="px-6 py-4 text-right text-sm space-x-2">
              <button onClick={() => onEdit(branch.id)} className="text-blue-600 hover:text-blue-900">
                수정
              </button>
              <button onClick={() => onDelete(branch.id)} className="text-red-600 hover:text-red-900">
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
