import { Inter } from "next/font/google";
import { useContext } from "react";
import { data } from "@/data/data";
import Header from "@/components/Header/Header";
import ImageList from "@/components/Images/ImageList";
import { Context } from "@/context/context";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { loading, isAuthenticated } = useContext(Context);
  const router = useRouter();

  if (isAuthenticated) {
    router.push("/gallery");
  }

  if (loading) {
    return (
      <div className="h-[500px] grid place-items-center animate-pulse">
        Authenticating... Please wait
      </div>
    );
  }

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
}
