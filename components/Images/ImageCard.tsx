import Image from "next/image";
import { FC } from "react";

interface ImageCardProps {
  path: string;
  title: string;
}

const ImageCard: FC<ImageCardProps> = ({ path, title }) => {
  return (
    <div className="pb-[2px] relative border-[1px] overflow-hidden border-[#e5e7eb] space-y-[5px] ">
      <div className="h-[200px] w-[270px] w-100 lg:w-[300px] mx-auto">
        <Image
          src={path}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
          className="w-[100%] h-auto bg-slate-50"
          alt=""
        />
      </div>
      <h1 className="max-w-[250px] text-black text-[0.75rem] px-[3px] ">{title}</h1>
    </div>
  );
};
export default ImageCard;
