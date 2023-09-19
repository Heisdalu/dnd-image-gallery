import { FC } from "react";
import ImageCard from "./ImageCard";
import { data } from "@/data/data";

const ImageList: FC = () => {
  return (
    <div className="p-1 flex flex-col items-center space-y-2 md:[grid-gap:1rem] md:py-2 md:justify-items-center md:grid grid-cols-2 md:space-y-[0] lg:grid-cols-3 vlg:grid-cols-4 lg:[grid-gap:1.5rem]">
      {data.map((el) => (
        <ImageCard key={el.id} path={el.pic} title={el.title} />
      ))}
    </div>
  );
};
export default ImageList;
