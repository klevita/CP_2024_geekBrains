<template>
  <q-input
    placeholder="Какой ворос вы хотите задать?"
    autogrow
    class="user-input"
    :class="{ 'user-input-animated': !focused }"
    @focus="focused = true"
    color="accent"
    rounded
    outlined
    v-model="model"
  >
    <template #append>
      <q-btn
        ref="btn"
        @click="send()"
        v-show="model.trim().length"
        flat
        rounded
        color="accent"
        class="user-input__btn"
        padding="8px"
      >
        <q-icon
          :name="symRoundedOutgoingMail"
          size="28px"
          class="user-input__btn__icon"
        ></q-icon>
      </q-btn>
    </template>
  </q-input>
</template>
<script setup lang="ts">
import { symRoundedOutgoingMail } from '@quasar/extras/material-symbols-rounded'
import { QBtn } from 'quasar'
import { MessageService } from 'src/api/services/MessageService'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const focused = ref(false)

const model = computed({
  get () {
    return props.modelValue
  },
  set (v: string) {
    emit('update:modelValue', v)
  }
})

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  modelValue: string;
}>()

function send () {
  if (model.value) {
    MessageService.sendMessage(model.value)
    setTimeout(() => {
      model.value = ''
    }, 1)
  }
}

function handleMail (e?: KeyboardEvent) {
  if (e) {
    if (e.key === 'Enter') {
      send()
    }
  }
}

onMounted(() => {
  document.addEventListener('keypress', handleMail)
})
onBeforeUnmount(() => {
  document.removeEventListener('keypress', handleMail)
})
</script>
<style scoped lang="scss">
@use "sass:color";
@import "../css/quasar.variables.scss";

.user-input {
  background-color: white;
  border-radius: 28px;
  & :deep(.q-field__control:before) {
    border: none !important;
  }
  & :deep(textarea) {
    margin-left: 12px;
  }
  & :deep(*) {
    font-size: 1.2rem;
  }
  &__btn {
    &__icon {
      position: relative;
      top: 2px;
      left: 2px;
    }
  }
}

.user-input-animated {
  animation: pulse-animation 1.5s infinite;
}

@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0 color.adjust($primary, $alpha: -0.7);
  }
  100% {
    box-shadow: 0 0 15px 25px color.adjust($primary, $alpha: -1);
  }
}
</style>
