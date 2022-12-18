<template>
  <div>
    <div class="bg-component-background rounded-lg m-4 p-4 shadow-xl">
      <div class="text-white text-2xl">
        <slot name="header"></slot>
      </div>
      <div class="text-gray-300 text-base">
        <slot name="subheader"></slot>
      </div>
      <div class="text-gray-300">
        <slot name="body"></slot>
      </div>
      <div class="text-gray-300 pt-7">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
