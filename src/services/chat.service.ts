import { enviromentDev } from "@/configs/enviroment.dev";
import { ChatHistorys, Chats, RoomChats } from "@/models/chat.model";
import axios from "axios";
import { getJwt, getUrl } from "./endpoint.service";


export function findChatRoomAll() {

  try {
    return axios.get<RoomChats[]>(getUrl()?.split('/v1')[0] + enviromentDev.chat + enviromentDev.room, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getJwt()}`,
      },
    })
  } catch (error) {
    throw error
  }
}

export function feedMessageChatByRoomId(room_id: string, page?: number, limit?: number) {

  try {
    return axios.get<ChatHistorys[]>(`${getUrl() + enviromentDev.chat}/room/${room_id}/chat-hitory?page=${page}&limit=${limit}`, {
      withCredentials: true
    })
  } catch (error) {
    throw error
  }
}

export async function mapDataHistoryToChat(chatHitory: ChatHistorys[]) {
  const mapMessage: Chats[] = chatHitory.map((r) => {
    return {
      avatar: r.Sender.image,
      message: r.message,
      client_id: r.Sender.id,
      name_send: r.Sender.first_name,
      post_date: r.create_date,
      user_id: r.Sender.id,
      room_id: r.receiver_id,
      type: r.type
    } as Chats;
  });
  return mapMessage
}