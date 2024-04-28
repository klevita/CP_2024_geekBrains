import { useUserStore } from 'src/stores/UserStore'
import { messageHttpClient } from '../MessagesHttpClient'
import { Message, useMessageStore } from 'src/stores/MessageStore'

export interface Room {
  id: number,
  name: string,
  human_need: boolean
}

class MessageService {
  static async searchMessages (search: string) {
    const response = await messageHttpClient().get(`answer_questions.json?query=${search}`)
    return response
  }

  static async getRooms () {
    const store = useUserStore()
    const response = await messageHttpClient().get(`rooms.json?username=${store.user.username}`)
    return response.data as Room[]
  }

  static async sendMessage (text:string) {
    const store = useUserStore()
    const messageStore = useMessageStore()
    const response = await messageHttpClient().post(`messages.json?username=${store.user.username}`, {
      text,
      room_id: messageStore.currentRoomId
    })
    return response
  }

  static async getMessages (offset: number, limit = 20) {
    const store = useUserStore()
    const messageStore = useMessageStore()
    const response = await messageHttpClient().get(`messages.json?username=${store.user.username}&room_id=${messageStore.getRoomId}&offset=${offset}&limit=${limit}`)
    return response.data as Message[]
  }
}

export { MessageService }
