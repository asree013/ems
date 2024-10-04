export interface Chats {
    type: string
    room_id: string,
    message: string,
    user_id: string,
    client_id: string,
    post_date: string,
    avatar: string,
    name_send: string
}

export interface ChatHistorys {
    id: string
    type: string
    message: string
    message_type: string
    sender_id: string
    receiver_id: string
    create_date: string
    Sender: {
      id: string
      first_name: string
      last_name: string
      role: string
      career: any
      image: string
    }
  }

export interface ChatRooms {
    room_id: string
    room_name: string
    type: string
}