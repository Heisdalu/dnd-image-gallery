import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
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
import { FC, useState } from "react";
import Grid from "./Grid";
import SortableCard from "./SortableCard";

const UserImage: FC = () => {
  const [userData, setUserData] = useState(data);

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

  const dragStartHandler = (e: DragStartEvent) => {};

  return (
    <div>
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={dragEndHandler}
        onDragStart={dragStartHandler}
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
    </div>
  );
};
export default UserImage;
