'use client'
import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export type TIconVehicleC = {icon: string, setIcon: Dispatch<SetStateAction<string>>}

export const IconVehicleContext = createContext<TIconVehicleC>(
  {} as TIconVehicleC
);

export const IconVehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [icon, setIcon] = useState<string>("");

  return (
    <IconVehicleContext.Provider value={{icon, setIcon}}>
      {children}
    </IconVehicleContext.Provider>
  )
};