<template>
  <q-btn class="chats-select" padding="4px 14px" color="accent" >
    <q-icon name="menu" size="28px">

    </q-icon>
    <q-menu :offset="[0,27]" max-width="calc(100vw - 32px)" max-height="calc(100vh - 90px)">
      <q-list style="min-width: 140px">
        <q-item v-for="room in rooms" :key="room.id" @click="messageStore.changeRoom(room.id)" clickable v-close-popup>
          <q-item-section>
            <div class="row justify-between items-center">
              {{ room.name }}
              <q-icon v-if="room.human_need" color="negative" class="q-ml-sm" size="20px" name="help_outline" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script setup lang="ts">
import { MessageService, Room } from 'src/api/services/MessageService'
import { useMessageStore } from 'src/stores/MessageStore'
import { onMounted, ref } from 'vue'

const messageStore = useMessageStore()

const rooms = ref<Room[]>([])

onMounted(async () => {
  rooms.value = await MessageService.getRooms()
  setInterval(async () => {
    rooms.value = await MessageService.getRooms()
  }, 3000)
})
</script>
<style scoped lang="scss">
// .chats-select{

// }
</style>
