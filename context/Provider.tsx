import { Context } from "./Context";
import { useState, ReactNode, FC, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/firebase/config";

interface dataTypes {
  loading: boolean;
  isAuthenticated: boolean;
}

interface ProviderProps {
  children: ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }) => {
  const [data, setData] = useState<dataTypes>({
    loading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
      
        setData((prev) => ({
          ...prev,
          loading: false,
          isAuthenticated: true,
        }));
      } else {
        setData((prev) => ({ ...prev, loading: false }));
      }
    });
  }, []);

  return <Context.Provider value={data}>{children}</Context.Provider>;
};
export default Provider;
