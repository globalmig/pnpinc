import Image from "next/image";

type MenuFeatureProps = {
  title: string;
  description: React.ReactNode; // <br /> 포함 가능하게
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: "left" | "right"; // 이미지 좌/우
};

export default function MenuFeature({ title, description, imageSrc, imageAlt = "", imagePosition = "left" }: MenuFeatureProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <div className={`flex flex-col md:flex-row gap-10 items-center mb-24 px-4 ${!isImageLeft ? "md:flex-row-reverse" : ""}`}>
      {/* 이미지 영역 */}
      <div className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-2xl">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      </div>

      {/* 텍스트 영역 */}
      <div className="w-full md:w-1/2 text-center md:text-left px-2">
        <h2 className={`text-3xl md:text-5xl font-semibold mb-3 ${!isImageLeft ? "text-center md:text-end" : ""}`}>{title}</h2>
        <p className={`text-xl mt-10 md:text-2xl leading-relaxed ${!isImageLeft ? "text-center md:text-end" : ""}`}>{description}</p>
      </div>
    </div>
  );
}
