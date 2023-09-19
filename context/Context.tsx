import { createContext } from "react";

export const Context = createContext({
  isAuthenticated: false,
  loading: true,
});
