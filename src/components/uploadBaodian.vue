<!--
 * @Author: lyudongzhou
 * @Date: 2022-04-21 13:35:57
 * @LastEditors: Lyudongzhou
 * @LastEditTime: 2022-05-06 15:39:24
 * @Description: 请填写简介
-->
<template>
  <div class="cover">
    <div class="select-title" v-if="props.title">{{ props.title }}</div>
    <ElUpload :http-request="uploadCover" :accept="props.fileTypes.join(',')" action=" ">
      <ElIcon :style="styleComputed">
        <Plus />
      </ElIcon>
    </ElUpload>
    <slot name="afterUpload"></slot>
    <el-image v-if="props.modelValue" class="image" :src="srcComputed" fit="scale-down" :style="styleComputed"
      :preview-src-list="[props.modelValue]" :initial-index="1" />
    <!-- <img class="image" :src="props.modelValue" v-if="props.modelValue" /> -->
    <ElIcon class="delete-icon" v-if="props.allowDelete && props.modelValue" @click="emits('update:modelValue', '')"
      :size="20">
      <Delete />
    </ElIcon>
  </div>
</template>

<script lang="ts" setup>
import { ElUpload, ElIcon, ElMessage, ElImage } from "element-plus";
import { Plus, Delete } from "@element-plus/icons";
import { withDefaults, computed } from "vue";
import { upload, AxiosSender } from "../upload/index";
type propsDef = {
  sizeLimit?: number;
  sizeLimitText?: string;
  fileTypes?: string[];
  title?: string;
  sender: AxiosSender;
  modelValue: any;
  allowDelete?: boolean;
  useZip?: boolean;
  zipSize?: number;
};
type emitsDef = {
  (e: "update:modelValue", url: string): void;
  (e: "onDelete"): void
};
const emits = defineEmits<emitsDef>();
const props = withDefaults(defineProps<propsDef>(), {
  sizeLimit: 5242880,
  sizeLimitText: "仅支持5M以内的图片文件。",
  fileTypes: () => ["image/jpeg", "image/jpg", "image/png"],
  title: "",
  allowDelete: true,
  useZip: true,
  zipSize: 178
});
const srcComputed = computed(() => {
  return props.modelValue + (props.useZip ? `?x-oss-process=image/resize,m_mfit,h_${props.zipSize},w_${props.zipSize}` : "");
});
const styleComputed = computed(() => {
  return { width: props.zipSize + "px", height: props.zipSize + "px" };
})
function isCorrectFileType(file: File, fileTypes: string[]) {
  return fileTypes.includes(file.type);
}
async function uploadCover(e: { file: File }) {
  if (e.file.size > props.sizeLimit) {
    ElMessage.error(props.sizeLimitText);
    return;
  }
  if (!isCorrectFileType(e.file, props.fileTypes)) {
    ElMessage.error(
      "仅支持" +
      props.fileTypes.map((type) => type.split("/")[1]).join("、") +
      "格式的图片文件。"
    );
    return;
  }
  const url = await upload(e, props.sender);
  emits("update:modelValue", url);
}
</script>
<style scoped lang="less">
.cover {
  display: inline-flex;
  position: relative;

  :deep(.el-upload-list) {
    display: none;
  }

  .delete-icon {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    background-color: white;
    transition: all 0.3s ease;
    border-radius: 5px;
  }

  .delete-icon:hover {
    color: #409eff;
    transition: all 0.3s ease;
  }

  .image {
    width: 178px;
    height: 178px;
    display: block;
    margin-left: 10px;
  }

  .select-title {
    width: 120px;
    text-align: right;
    line-height: 40px;
    padding: 0 12px 0 0;
    cursor: default;
  }

  .select-title:before {
    content: "*";
    color: rgb(245, 108, 108);
    margin-right: 4px;
  }

  :deep(.el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  :deep(.el-upload:hover) {
    border-color: #409eff;
  }

  :deep(.el-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    line-height: 178px;
  }
}
</style>
