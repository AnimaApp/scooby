import React, { createContext, useContext, useMemo, useState } from "react";
import { ScoobyWebAPI } from "./types";

interface APIContextValue {
  api: ScoobyWebAPI | undefined;
  setApi: (api: ScoobyWebAPI) => void;
}

const APIContext = createContext<APIContextValue | null>(null);

export const APIContextProvider: React.FC<{
  defaultApi?: ScoobyWebAPI;
  children: React.ReactNode;
}> = ({ defaultApi, children }) => {
  const [api, setApi] = useState<ScoobyWebAPI | undefined>(defaultApi);
  const context = useMemo(
    () => ({
      api,
      setApi,
    }),
    [api, setApi]
  );

  return <APIContext.Provider value={context}>{children}</APIContext.Provider>;
};

export function useAPI(): { api: ScoobyWebAPI } {
  const appContext = useContext(APIContext);

  if (!appContext) {
    throw new Error("uninitialized API context");
  }

  const api = appContext.api;
  if (!api) {
    throw new Error("uninitialized API");
  }

  return { api };
}

export function useSetAPI(): {
  setApi: (api: ScoobyWebAPI) => void;
} {
  const appContext = useContext(APIContext);

  if (!appContext) {
    throw new Error("uninitialized API context");
  }

  return appContext;
}
