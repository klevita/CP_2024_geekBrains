<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white">
      <q-toolbar color="white" class="q-ma-xs">
        <ChatsSelect v-if="store.user.username === 'admin'" />
        <q-toolbar-title>{{store.user.username}}</q-toolbar-title>
        <img :src="svgLogo" style="margin-left: -8px;width:200px" />
        <q-space />
        <q-btn @click="handleClick()" flat round color="accent" size="md" icon="logout" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="background">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import ChatsSelect from 'src/components/ChatsSelect.vue'
import { useMessageStore } from 'src/stores/MessageStore'
import svgLogo from 'assets/geek-brains-logo.svg'
import { useUserStore } from 'src/stores/UserStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()
const messageStore = useMessageStore()

function handleClick () {
  messageStore.disconnect()
  store.logout()
  router.push({ name: 'Login' })
}
</script>
