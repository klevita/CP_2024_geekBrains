<template>
  <div class="user-chat" ref="scrollContainer">
    <div class="user-chat__scroll-item" v-if="lastMessageUser && !userStore.isAdmin" >
      <UserMessageSkeleton />
    </div>
    <div
      class="user-chat__scroll-item"
      v-for="message in messages"
      :key="message.id"
    >
      <UserMessage :reverse="message.user.name === userStore.user.username" v-bind="message" />
    </div>

  </div>
</template>
<script setup lang="ts">
import UserMessage from './UserMessage.vue'
import UserMessageSkeleton from './UserMessageSkeleton.vue'
import { Message, useMessageStore } from 'src/stores/MessageStore'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { MessageService } from 'src/api/services/MessageService'
import { useUserStore } from 'src/stores/UserStore'
import { throttle } from 'quasar'

const userStore = useUserStore()
const messageStore = useMessageStore()

const oldMessages = ref<Message[]>([])
let oldMessagesOffset = 0
const oldMessagesLoading = ref(false)

const messages = computed<Message[]>(() => {
  return [...[...messageStore.messages].reverse(), ...oldMessages.value]
})

const lastMessageUser = computed(() => {
  return messages.value.at(0)?.user?.name !== 'admin' && messages.value.at(0)?.user?.name !== 'manager'
})

const scrollContainer = ref<HTMLDivElement>()

function listenScroll () {
  if (scrollContainer.value?.clientHeight && scrollContainer.value.scrollHeight) {
    if (scrollContainer.value.clientHeight - scrollContainer.value.scrollHeight + 100 > scrollContainer.value?.scrollTop) {
      fetchMessages()
    }
  }
}

const fetchMessages = throttle(async function () {
  if (!oldMessagesLoading.value) {
    oldMessagesLoading.value = true
    oldMessages.value = [...oldMessages.value, ...(await MessageService.getMessages(oldMessagesOffset))]
    oldMessagesOffset += 20
    oldMessagesLoading.value = false
  }
}, 500)

watch(() => messageStore.currentRoomId, () => {
  oldMessagesOffset = 0
  oldMessages.value = []
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
