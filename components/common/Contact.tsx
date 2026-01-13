import { useState } from "react";

export default function SalesConsultationLayout() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    agreeToPrivacy: false,
  });

  const handleSubmit = () => {
    if (!formData.agreeToPrivacy) {
      alert("개인정보취급방침에 동의해주세요.");
      return;
    }
    console.log("제출된 데이터:", formData);
    alert("문의가 접수되었습니다!");
  };

  return (
    <div className=" flex flex-col md:flex-row md:h-[700px]">
      {/* 왼쪽 섹션 - 히어로 이미지 */}
      <div className="w-full md:w-1/2  relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-100 bg-[url('/images/bg_contact.png')] bg-no-repeat " />

        <div className="relative z-10 h-full flex flex-col justify-center items-start p-8 md:p-16 text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            저희가 매출을
            <br />
            올려드리겠습니다!
          </h2>

          <div className="mt-12">
            <p className="text-2xl md:text-4xl mb-6">
              <span className="text-white">문의 </span>
              <span className="text-red-500 font-bold">'즉시'</span>
              <span className="text-white"> 상담 가능합니다.</span>
            </p>

            <div className="flex items-center gap-4 mt-12">
              <div className="bg-red-500 rounded-full p-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <span className="text-3xl md:text-4xl font-bold">02-400-1230</span>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 섹션 - 상담 폼 */}
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 ">창업상담문의</h2>

          <div className="space-y-6">
            {/* 성함 입력 */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">성함</label>
              <input
                type="text"
                placeholder="성함을 입력해주세요."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* 연락처 입력 */}
            <div>
              <label className="block  text-basefont-medium text-gray-700 mb-2">연락처</label>
              <input
                type="tel"
                placeholder="성함을 입력해주세요."
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* 개인정보 동의 */}
            <div className="flex items-start gap-3 pb-10">
              <input
                type="checkbox"
                id="privacy"
                checked={formData.agreeToPrivacy}
                onChange={(e) => setFormData({ ...formData, agreeToPrivacy: e.target.checked })}
                className="mt-1 w-5 h-5 text-red-500 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="privacy" className="text-sm text-gray-700 flex-1">
                개인정보취급방침을 읽었으며 이에 동의합니다.
                <button type="button" className="ml-2 text-gray-500 underline hover:text-gray-700" onClick={() => alert("개인정보취급방침 내용")}>
                  자세히 보기
                </button>
              </label>
            </div>

            {/* 제출 버튼 */}
            <button onClick={handleSubmit} className="w-full bg-[#E60115] hover:bg-red-600 text-white font-bold my-10 py-4 px-6 rounded-lg transition duration-200 text-lg">
              문의하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
