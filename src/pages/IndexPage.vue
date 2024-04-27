<template>
  <div class="index-page">
    <UserChat class="col-grow full-width" />
    <div class="index-page__input-wrapper">
      <UserInput class="full-width" v-model="input" />
    </div>
  </div>
</template>
<script setup lang="ts">
import UserChat from 'src/components/UserChat.vue'
import UserInput from 'src/components/UserInput.vue'
import { ref } from 'vue'

const input = ref('')
</script>
<style scoped lang="scss">
@import "../css/app.scss";

.index-page {
  height: calc(100vh - 58px);
  display: flex;
  align-items: center;
  flex-direction: column;
  &__input-wrapper {
    @extend .background;
    border-radius: 12px 12px 0 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    height:96px;
    padding: 16px 16px 24px 16px;
    margin-top: 24px;
    max-width: 1024px;
  }
}
</style>
