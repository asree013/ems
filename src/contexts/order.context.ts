import { OrderTranfer } from "@/models/order_tranfer.model";
import { Dispatch, SetStateAction, createContext } from "react";

export type TOrderContext = {
    order: OrderTranfer[];
    setOrder: Dispatch<SetStateAction<OrderTranfer[]>>;
};

export const OrderContext = createContext<TOrderContext>({} as TOrderContext);
