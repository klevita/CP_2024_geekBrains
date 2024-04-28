<template>
  <div
    @click="
      model = formattedSearch;
      prompt = undefined;
    "
    v-if="prompt"
    class="prompt"
  >
    Возможно вы имели ввиду: {{ formattedSearch }}?
  </div>
  <q-input
    placeholder="Какой вопрос вы хотите задать?"
    class="user-input"
    :class="{ 'user-input-animated': !focused }"
    @focus="focused = true"
    color="accent"
    rounded
    outlined
    v-model="model"
  >
    <template #append>
      <div class="row items-center">
        <div class="category" v-if="categories?.at(0) && !userStore.isAdmin">
          {{ categories.at(0)?.category }}
        </div>
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
      </div>
    </template>
  </q-input>
</template>
<script setup lang="ts">
import { symRoundedOutgoingMail } from '@quasar/extras/material-symbols-rounded'
import { QBtn, debounce } from 'quasar'
import { Categories, MessageService } from 'src/api/services/MessageService'
import { spellcheck } from 'src/api/services/SpellCheck'
import { useUserStore } from 'src/stores/UserStore'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const userStore = useUserStore()

const focused = ref(false)
const categories = ref<Categories[]>([])

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

async function send () {
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

const prompt = ref<
  | {
      pos: number;
      len: number;
      s: string[];
    }[]
  | undefined
>(undefined)

const formattedSearch = computed(() => {
  let str = model.value
  if (prompt.value) {
    prompt.value.forEach((v) => {
      str = str.slice(0, v.pos) + v.s[0] + str.slice(v.pos + v.len)
    })
  }
  return str
})

const searchHandle = async (v: string) => {
  const resp = await spellcheck(v)
  categories.value = await MessageService.searchMessages(model.value)
  prompt.value = resp
  if (prompt.value && !prompt.value.length) {
    prompt.value = undefined
  }
}

const debouncedSearch = debounce(searchHandle, 400)

onMounted(() => {
  document.addEventListener('keypress', handleMail)
})
onBeforeUnmount(() => {
  document.removeEventListener('keypress', handleMail)
})

watch(model, (v: string) => {
  if (v) {
    debouncedSearch(v)
  }
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

.prompt {
  position: absolute;
  top: -8px;
  left: 40px;
  cursor: pointer;
  color: rgb(41, 41, 255);
  &:hover {
    text-decoration: underline;
  }
}

.category {
  border: 1px solid $primary;
  height: min-content;
  border-radius: 4px;
  padding: 0 8px;
  color: $primary;
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
