<template>
  <div class="user-chat" ref="scrollContainer">
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
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { MessageService } from 'src/api/services/MessageService'
import { useUserStore } from 'src/stores/UserStore'

const userStore = useUserStore()
const messageStore = useMessageStore()

const oldMessages = ref<Message[]>([])
let oldMessagesOffset = 0
const oldMessagesLoading = ref(false)

const messages = computed<Message[]>(() => {
  return [...[...messageStore.messages].reverse(), ...oldMessages.value]
})

const scrollContainer = ref<HTMLDivElement>()

function listenScroll () {
  if (scrollContainer.value?.clientHeight && scrollContainer.value.scrollHeight) {
    if (scrollContainer.value.clientHeight - scrollContainer.value.scrollHeight + 100 > scrollContainer.value?.scrollTop) {
      fetchMessages()
    }
  }
}

async function fetchMessages () {
  if (!oldMessagesLoading.value) {
    oldMessagesLoading.value = true
    oldMessages.value = [...oldMessages.value, ...(await MessageService.getMessages(oldMessagesOffset))]
    oldMessagesOffset += 20
    oldMessagesLoading.value = false
  }
}

watch(() => messageStore.currentRoomId, () => {
  fetchMessages()
})
onMounted(() => {
  messageStore.connect()
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', listenScroll)
  }
})
onBeforeUnmount(() => {
  scrollContainer.value?.removeEventListener('scroll', listenScroll)
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
