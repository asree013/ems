import { Dispatch, SetStateAction, createContext } from "react";

export type TDiviveContexts = {
    devices: Device[]
    setDevices: Dispatch<SetStateAction<Device[]>>;
}

export const DeviceContexts = createContext<TDiviveContexts>({} as TDiviveContexts)