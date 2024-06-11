import { ExanShows, Exans } from "@/models/exan.model";
import { endpoint } from "./endpoint.service";
import { enviromentDev } from "@/interfaces/enviroment.dev";

export function createExanByHistoryId(item: Exans) {
    try {
        return endpoint.post<ExanShows>(`${enviromentDev.history}/${item.history_id}${enviromentDev.exan}`, item)
    } catch (error) {
        throw error
    }
}

export function findExanByHistoryId(history_id: string) {
    try {
        return endpoint.get<ExanShows[]>(`${enviromentDev.history}/${history_id}${enviromentDev.exan}`)
    } catch (error) {
        throw error
    }
}