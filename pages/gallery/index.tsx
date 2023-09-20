import Header from "@/components/Header/Header";
import { Context } from "@/context/Context";
import { FC, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserImage from "@/components/UserImage/UserImage";

const Gallery: FC = () => {
  const { isAuthenticated, loading } = useContext(Context);
  const [isReady, setIsReady] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
    setIsReady(true);
  }, [isAuthenticated, router]);

  if (loading)
    return (
      <div className="h-[500px] grid place-items-center animate-pulse">
        Authenticating... Please wait
      </div>
    );

  return (
    <div className="py-0.5 ">
      <>
        <Header isAuthenticated={isAuthenticated} />
        <div>{isReady && <UserImage />}</div>
      </>
    </div>
  );
};
export default Gallery;
