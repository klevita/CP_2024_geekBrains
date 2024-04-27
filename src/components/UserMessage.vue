<template>
  <div class="user-message" :class="{'reverse': reverse}">
    <div :class="{'reverse': reverse}">
      <q-icon class="user-message__avatar" :class="{'reverse-color': reverse}" :name="symRoundedNeurology" size="40px" />
      <div class="user-message__text-block" :class="{'reverse-color': reverse}">
        <div v-if="!reverse" class="user-message__text-block__name">
          {{ props.user.name }}
        </div>
        <div class="user-message__text-block__text" :class="{'q-mt-xs': reverse}">
          {{ props.text }}
        </div>
      </div>
    </div>
    <q-space />
  </div>
</template>
<script setup lang="ts">
import { symRoundedNeurology } from '@quasar/extras/material-symbols-rounded'
import { Message } from 'src/stores/MessageStore'

const props = defineProps<Message & {reverse?:boolean}>()
</script>
<style scoped lang="scss">
.user-message{
  display: flex;
  width:100%;
  & > :first-child{
    display: flex;
  }
  &__avatar{
    background-color: white;
    border-radius: 50%;
  }
  &__text-block {
    background-color: white;
    margin: 0 16px;
    border-radius: 16px;
    padding: 8px 16px 12px 16px;
    &__name{
      font-size: 18px;
      color:$primary;
    }
    &__text{
      overflow-wrap: anywhere;
    }
  }
}
.reverse {
  flex-direction: row-reverse;
}
.reverse-color {
  background-color: rgb(227, 237, 255);
}
</style>
