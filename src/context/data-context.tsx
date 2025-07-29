import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { FactorioLabData } from "../types.d.ts";

type DataContextType = {
  data: FactorioLabData | null;
  setData: (data: FactorioLabData) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataContextProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<FactorioLabData | null>(null);
  
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }

  return context;
}
