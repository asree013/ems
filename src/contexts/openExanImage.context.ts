import { Dispatch, SetStateAction, createContext } from "react";

export type TypeOpenExanContext = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
  
  export const OpenExanImage = createContext<TypeOpenExanContext>(
    {} as TypeOpenExanContext,
  );