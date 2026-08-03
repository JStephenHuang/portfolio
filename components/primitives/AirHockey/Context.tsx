import { createContext, PropsWithChildren, RefObject, useContext } from "react";

export type AirHockeyPhysics = {
  friction: number;
  bounce: number;
};

interface AirHockeyContextValue {
  physics: AirHockeyPhysics;
  off: boolean;
  rinkRef: RefObject<HTMLDivElement | null>;
}

export interface ProviderProps {
  physics: AirHockeyPhysics;
  off?: boolean;
  rinkRef: RefObject<HTMLDivElement | null>;
}

const AirHockeyContext = createContext<AirHockeyContextValue | null>(null);

export const Provider: React.FC<PropsWithChildren<ProviderProps>> = ({ children, physics, off = false, rinkRef }) => {
  return (
    <AirHockeyContext.Provider
      value={{
        physics,
        off,
        rinkRef,
      }}
    >
      {children}
    </AirHockeyContext.Provider>
  );
};

export const useAirHockeyContext = () => {
  const context = useContext(AirHockeyContext);

  if (!context) {
    throw new Error("useAirHockeyContext must be used within AirHockeyContext.");
  }

  return context;
};
