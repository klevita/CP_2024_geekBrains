<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar color="white" class="q-ma-xs">
        <q-toolbar-title>Quasar App</q-toolbar-title>
        <q-btn flat round color="white" size="md" icon="logout" />
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

</script>
