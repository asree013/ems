import { enviromentDev } from "@/configs/enviroment.dev";
import { endpoint } from "./endpoint.service";

export function findAllBedInShipByShipId(ship_id: string, page: number, limit: number) {
    return endpoint.get(enviromentDev.ship +`/${ship_id}/bed?page=${page}&limit=${limit}`)
}