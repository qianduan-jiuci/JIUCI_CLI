<script setup lang="ts"></script>

<template>
  <suspense>
    <template #default>
      <router-view></router-view>
    </template>
    <template #fallback> loading </template>
  </suspense>
</template>

<style scoped></style>
