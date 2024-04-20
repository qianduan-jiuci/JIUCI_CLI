<script setup lang="ts">
import { ElMessageBox } from "element-plus";
import type { DrawerProps } from "element-plus";
import { ref } from "vue";

const drawer = defineModel();
defineSlots<{
  default: () => void;
  header: () => void;
}>();

const direction = ref<DrawerProps["direction"]>("rtl");
function cancelClick() {
  drawer.value = false;
}
function confirmClick() {
  ElMessageBox.confirm(`确定要关闭窗口吗 ?`)
    .then(() => {
      drawer.value = false;
    })
    .catch(() => {
      // catch error
    });
}
</script>

<template>
  <el-drawer v-model="drawer" :direction="direction">
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped></style>
