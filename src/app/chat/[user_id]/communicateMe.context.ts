import { Communicates } from "@/models/communicate.model"
import { createContext, Dispatch, SetStateAction } from "react"

export type TCommunicateMeContext = {
    communicateMe: Communicates
    setCommunicateMe: Dispatch<SetStateAction<Communicates>>
}

export const CommunicateMeContext = createContext<TCommunicateMeContext>({} as TCommunicateMeContext)