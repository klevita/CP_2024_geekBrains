import { defineStore } from 'pinia'

export interface Message {
  created_at: string;
  id: number;
  room_id: number;
  text: string;
  updated_at: string;
  user_id: number;
  user: {
    id: number,
    name: string
}
}

export const useMessageStore = defineStore('messages', {
  state: () => ({
    messages: [] as Message[],
    currentRoomId: -1
  }),
  getters: {
    getRoomId (state) {
      return state.currentRoomId
    }
  }
})
