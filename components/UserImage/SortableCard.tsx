import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

interface Props {
  id: number;
  path: string;
  title: string;
}

const SortableCard: FC<Props> = ({ id, path, title }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="pb-[2px] relative border-[1px] overflow-hidden border-[#e5e7eb] space-y-[5px] "
    >
      <div className="h-[200px] w-[270px] w-100 lg:w-[300px] mx-auto">
        <Image
          src={path}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
          className="w-[100%] h-auto bg-slate-50"
          alt={title}
        />
      </div>
      <h1 className="bg-white max-w-[250px] text-black text-[0.75rem] px-[3px] ">
        {title}
      </h1>
    </div>
  );
};
export default SortableCard;
