<template>
  <div class="user-message-skeleton">
    <div>
      <q-skeleton type="circle" size="xl" />
      <div class="user-message-skeleton__text-block">
        <div class="user-message-skeleton__text-block__name">
          <q-skeleton type="text" height="18px" width="120px" />
        </div>
        <div class="user-message-skeleton__text-block__text">
          <q-skeleton type="text" width="240px" height="14px" />
        </div>
      </div>
    </div>
    <q-space />
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.user-message-skeleton{
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
    margin-left: 8px;
    border-radius: 16px;
    padding: 8px 16px 12px 16px;
    &__name {
      display: flex;
      align-items: center;
      height: 27px;
    }
    &__text {
      display: flex;
      align-items: center;
      height: 21px;
    }
  }
}
</style>
