import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensor,
  useSensors,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { data } from "@/data/data";
import { FC, useState, MouseEventHandler, useRef } from "react";
import Grid from "./Grid";
import SortableCard from "./SortableCard";

const UserImage: FC = () => {
  const [userData, setUserData] = useState(data);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sensors = useSensors(useSensor(TouchSensor), useSensor(MouseSensor));

  const dragEndHandler = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!active?.id || !over?.id) return;

    if (active?.id !== over?.id) {
      setUserData((prevItems) => {
        const activeIndex = prevItems.indexOf(
          prevItems.find((el) => el.id === active.id)!
        );
        const overIndex = prevItems.indexOf(
          prevItems.find((el) => el.id === over.id)!
        );

        return arrayMove(prevItems, activeIndex, overIndex);
      });
    }
  };

  const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (inputRef.current && inputRef.current.value) {
      const value = inputRef.current.value;
      const result = data.filter((el) => el.title.includes(value));
      setUserData(result);
    }
    if (inputRef.current && !inputRef.current.value) {
      setUserData(data);
    }
  };

  return (
    <div>
      <div className="px-0.5 space-y-1 my-1 flex flex-col mx-auto max-w-[400px] md:flex-row md:space-x-1 md:space-y-[0] ">
        <input
          ref={inputRef}
          type="search"
          className="p-1 border-1 w-[100%] text-1 rounded-[6px]"
          placeholder="search images"
        />

        <button
          onClick={clickHandler}
          className="bg-black text-white border-1 mx-auto px-1 py-0.5 rounded-[4px] active:bg-gray-300"
        >
          Search
        </button>
      </div>

      {userData.length === 0 ? (
        <div className="text-center mt-2 font-bold">No result found</div>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragEnd={dragEndHandler}
        >
          <Grid>
            <SortableContext items={userData} strategy={rectSortingStrategy}>
              {userData.map((el) => (
                <SortableCard
                  key={el.id}
                  id={el.id}
                  path={el.pic}
                  title={el.title}
                />
              ))}
            </SortableContext>
          </Grid>
        </DndContext>
      )}
    </div>
  );
};
export default UserImage;
