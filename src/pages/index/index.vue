<script setup lang="ts">
// import { yiyan } from "../apis/randomoneWord";
import { getMusic } from "../../apis/randomMusic";
const getData = async () => {
  try {
    const data = await getMusic();
    console.log(`output->data`, data);
  } catch (error) {
    console.error(`output->error`, error);
  }
};
</script>

<template>
  <el-button @click="getData">发送请求获取数据</el-button>
</template>

<style scoped></style>
