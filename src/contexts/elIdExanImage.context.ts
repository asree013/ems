import { createContext, Dispatch, SetStateAction } from "react";

export const ElIdExanImage = createContext<TypeElIDContext>(
    {} as TypeElIDContext,
);

export type TypeElIDContext = {
    el_id: string;
    setEl_id: Dispatch<SetStateAction<string>>;
};