import { enviromentDev } from "@/configs/enviroment.dev";
import { endpoint } from "./endpoint.service";
import { Communicates, Rooms } from "@/models/communicate.model";

export function getCommunicationAll() {
    return endpoint.get<Communicates[]>(enviromentDev.communicate)
}

export function getCommunicationMe() {
    return endpoint.get<Communicates>(enviromentDev.communicate + '/me')
}

export function findCommunicateByUserId(user_id: string){
    return endpoint.get<Communicates>(enviromentDev.communicate + '/' + user_id)
}

export function joinCommunicationByCommunicateId(communicate_id: string){
    return endpoint.patch<Rooms>(enviromentDev.communicate + '/join/' + communicate_id)
}