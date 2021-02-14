import React, { createContext, useState } from "react";
import Supercluster from "supercluster";

interface SuperclusterContextProps {
  supercluster?: Supercluster;
}

export const SuperclusterContext = createContext<SuperclusterContextProps>({});

interface Props {
  children: React.ReactNode;
}

const SuperclusterContextProvider = ({ children }: Props) => {
  const [supercluster] = useState(
    new Supercluster({
      radius: 20,
      maxZoom: 18,
      extent: 256,
      minPoints: 3,
    })
  );

  return (
    <SuperclusterContext.Provider value={{ supercluster }}>
      {children}
    </SuperclusterContext.Provider>
  );
};

export default SuperclusterContextProvider;
