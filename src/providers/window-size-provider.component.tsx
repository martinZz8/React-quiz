import React, {createContext, useEffect, useState} from "react";

// hooks
import useWindowSize from "../hooks/useWindowSize";

export interface IWindowContext {
  windowWidth: number;
  windowHeight: number;
}

const innerWindowContext: IWindowContext = {
  windowWidth: 0,
  windowHeight: 0
};

export const WindowContext = createContext(innerWindowContext);

const WindowSizeProvider: React.FC = ({children}) => {
  const {windowWidth, windowHeight} = useWindowSize();

  return (
    <WindowContext.Provider
      value={{
        windowWidth: windowWidth,
        windowHeight: windowHeight
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export default WindowSizeProvider;