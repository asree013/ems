import { ImageExan } from "@/models/exan.model";
import { Dispatch, SetStateAction, createContext } from "react";

export type TModalImageExan = {
    previewImage: ImageExan[];
    setPreviewImage: Dispatch<SetStateAction<ImageExan[]>>;
};

export const ModalImageExanContext = createContext<TModalImageExan>(
    {} as TModalImageExan,
);