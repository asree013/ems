import { ExanShows } from "@/models/exan.model";
import { Dispatch, SetStateAction, createContext } from "react";

export type TypeExanContext = {
    exan: ExanShows[];
    setExan: Dispatch<SetStateAction<ExanShows[]>>;
};
export const ExanContextBody = createContext<TypeExanContext>(
    {} as TypeExanContext,
);