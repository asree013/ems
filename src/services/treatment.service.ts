import { Treatments } from "@/models/traeteMent";
import { endpoint } from "./endpoint.service";
import { enviromentDev } from "@/configs/enviroment.dev";

export function createTreatment(data: Treatments) {
    return endpoint.post<Treatments>(enviromentDev.teatment, data)
}