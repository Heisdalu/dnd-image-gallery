import { Inter } from "next/font/google";
import { useContext } from "react";
import { data } from "@/data/data";
import Header from "@/components/Header/Header";
import ImageList from "@/components/Images/ImageList";
import { Context } from "@/context/Context";
import { useRouter } from "next/router";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { loading, isAuthenticated } = useContext(Context);
  const router = useRouter();

  if (isAuthenticated) {
    router.push("/gallery");
    return <div></div>;
  }

  if (loading) {
    return (
      <div className="h-[500px] grid place-items-center animate-pulse">
        Authenticating... Please wait
      </div>
    );
  }

  return (
    <div className="py-0.5 h-[500px] grid place-items-center ">
      <div className="space-y-[1.5rem]">
        {/* <Header isAuthenticated={isAuthenticated} /> */}
        <h1 className="text-[1.5rem] font-bold md:text-[3rem] text-center">
          Welcome to Image gallery
        </h1>

        <div className="p-0.5 flex justify-center space-x-1.5">
          <Link
            href="/login"
            className="border-1 rounded-[6px] py-[0.5rem] px-1"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="border-1 rounded-[6px] py-[0.5rem] px-1"
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}
