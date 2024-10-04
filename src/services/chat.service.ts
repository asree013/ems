import { enviromentDev } from "@/configs/enviroment.dev";
import { ChatHistorys, ChatRooms } from "@/models/chat.model";
import axios from "axios";

export function findChatRoomAll() {
    try {
        return axios.get<ChatRooms[]>(enviromentDev.baseUrl_base + enviromentDev.chat + enviromentDev.room, {
            withCredentials: true
        })
    } catch (error) {
        throw error
    }
}

export function feedMessageChatByRoomId(room_id: string, page?: number, limit?: number) {
    
    try {
        return axios.get<ChatHistorys[]>(`${enviromentDev.baseUrl_base + enviromentDev.chat }/room/${room_id}/chat-hitory?page=${page}&limit=${limit}`, {
            withCredentials: true
        })
    } catch (error) {
        throw error
    }
}