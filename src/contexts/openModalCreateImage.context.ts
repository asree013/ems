import { Dispatch, SetStateAction, createContext } from "react";

export type TModalCreate = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const OpenModalCreateImageContext = createContext<TModalCreate>(
  {} as TModalCreate,
);