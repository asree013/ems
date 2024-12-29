import { enviromentDev } from "@/configs/enviroment.dev";
import { endpoint } from "./endpoint.service";
import { MissionTagSetting } from "@/models/missionTagSetting.model";

export function getMissionTagSetting(page: number, limit: number){
    return endpoint.get<MissionTagSetting[]>(enviromentDev.settingTag + `?page=${page}&limit=${limit}`)
}

export function createMissionTagSetting(data: MissionTagSetting) {
    return endpoint.post<MissionTagSetting>(enviromentDev.settingTag, data)
}

export function updateMissionTagSetting(id: string, data: MissionTagSetting) {
    return endpoint.put<MissionTagSetting>(enviromentDev.settingTag + '/' +id, data)
}