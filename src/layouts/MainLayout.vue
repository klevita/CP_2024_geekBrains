<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar color="white" class="q-ma-xs">
        <q-toolbar-title>{{store.user.username}}</q-toolbar-title>
        <q-btn @click="store.logout();$router.push({name:'Login'})" flat round color="accent" size="md" icon="logout" />
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
import { useUserStore } from 'src/stores/UserStore'

const store = useUserStore()
</script>
