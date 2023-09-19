import Header from "@/components/Header/Header";
import ImageList from "@/components/Images/ImageList";
import { Context } from "@/context/context";
import { FC, useContext } from "react";

const Gallery: FC = () => {
  const { isAuthenticated } = useContext(Context);
  return (
    <div className="py-0.5 ">
      <>
        <Header isAuthenticated={isAuthenticated} />
        <div>
          <ImageList />
        </div>
      </>
    </div>
  );
};
export default Gallery;
