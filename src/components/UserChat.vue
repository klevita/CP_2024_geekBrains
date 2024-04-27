<template>
  <div class="user-chat" ref="scroll-container">
    <div
      class="user-chat__scroll-item"
      v-for="message in messages"
      :key="message.id"
    >
      <UserMessage :reverse="message.user.name === userStore.user.username" v-if="1" v-bind="message" />
      <UserMessageSkeleton v-else />
    </div>
    <div></div>
  </div>
</template>
<script setup lang="ts">
import UserMessage from './UserMessage.vue'
import UserMessageSkeleton from './UserMessageSkeleton.vue'
import { Message, useMessageStore } from 'src/stores/MessageStore'
import { computed, onMounted, ref, watch } from 'vue'
import { MessageService } from 'src/api/services/MessageService'
import { useUserStore } from 'src/stores/UserStore'

const userStore = useUserStore()
const messageStore = useMessageStore()

const oldMessages = ref<Message[]>([])

const messages = computed<Message[]>(() => {
  return [...[...messageStore.messages].reverse(), ...oldMessages.value]
})

watch(() => messageStore.currentRoomId, async () => {
  oldMessages.value = await MessageService.getMessages(0)
})
onMounted(() => {
  messageStore.connect()
})
</script>
<style scoped lang="scss">
.user-chat {
  display: flex;
  flex-direction: column-reverse;
  max-height: 100%;
  padding-bottom: 118px;
  overflow-y: scroll;
  &__scroll-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    & > * {
      max-width: 1000px;
    }
  }
}
</style>
