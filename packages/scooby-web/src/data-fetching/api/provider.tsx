import React, { createContext, useContext, useMemo } from "react";
import { ScoobyWebAPI } from "./types";

interface APIContextValue {
  api: ScoobyWebAPI;
}

const APIContext = createContext<APIContextValue | null>(null);

export const APIContextProvider: React.FC<{
  api: ScoobyWebAPI;
  children: React.ReactNode;
}> = ({ api, children }) => {
  const context = useMemo(
    () => ({
      api,
    }),
    [api]
  );

  return <APIContext.Provider value={context}>{children}</APIContext.Provider>;
};

export function useAPI(): { api: ScoobyWebAPI } {
  const appContext = useContext(APIContext);

  if (!appContext) {
    throw new Error("uninitialized API");
  }

  return appContext;
}
