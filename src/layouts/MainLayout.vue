<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar color="white" class="q-ma-xs">
        <q-toolbar-title>{{store.user.username}}</q-toolbar-title>
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
import { useMessageStore } from 'src/stores/MessageStore'
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
