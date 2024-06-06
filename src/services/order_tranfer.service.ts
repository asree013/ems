import { enviromentDev } from "@/interfaces/enviroment.dev";
import { CreateOrder, OrderTranfer } from "@/models/order_tranfer.model";
import axios from "axios";
import { endpoint } from "@/services/endpoint.service";

export async function findAllOrderTranfer(): Promise<OrderTranfer[]>{
    try {
        const result = await endpoint.get<OrderTranfer[]>(enviromentDev.orderTranfer)
        return result.data
    } catch (error) {
        throw error
    }
}

export async function findOrderTranferByOrderId(order_tranfer_id: string) {
    try {
        return endpoint.get<OrderTranfer>(`${enviromentDev.orderTranfer}/${order_tranfer_id}`)
    } catch (error) {
        throw error
    }
}

export function createOrderTranfer(item: CreateOrder) {
    try {
        return endpoint.post<OrderTranfer>(`${enviromentDev.orderTranfer}`, item)
    } catch (error) {
        throw error
    }
}

export function CompletedOrderTranferByOrderId(order_tranfer_id: string) {
    try {
        return endpoint.put<OrderTranfer>(`${enviromentDev.orderTranfer}/close-order/${order_tranfer_id}`)
    } catch (error) {
        throw error
    }
}

export function editOrderTranferByOrderId(order_tranfer_id: string, item: OrderTranfer) {
    try {
        return endpoint.put<OrderTranfer>(`${enviromentDev.orderTranfer}/${order_tranfer_id}`, item)
    } catch (error) {
        throw error
    }
}