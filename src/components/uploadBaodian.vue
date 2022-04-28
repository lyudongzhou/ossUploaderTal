<!--
 * @Author: lyudongzhou
 * @Date: 2022-04-21 13:35:57
 * @LastEditors: Lyudongzhou
 * @LastEditTime: 2022-04-22 15:58:35
 * @Description: 请填写简介
-->
<template>
  <div class="cover">
    <div class="select-title">{{ props.title }}</div>
    <ElUpload
      class="avatar-uploader"
      :http-request="uploadCover"
      :accept="props.fileTypes.join(',')"
      action=" "
    >
      <ElIcon class="avatar-uploader-icon">
        <Plus />
      </ElIcon>
    </ElUpload>
    <img class="image" :src="props.modelValue" v-if="props.modelValue" />
  </div>
</template>

<script lang="ts" setup>
import { ElUpload, ElIcon, ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons";
import { withDefaults } from "vue";
import { upload, AxiosSender } from "../upload/index";
type propsDef = {
  sizeLimit?: number;
  sizeLimitText?: string;
  fileTypes?: string[];
  title?: string;
  sender: AxiosSender;
  modelValue: any;
};
type emitsDef = {
  (e: "update:modelValue", url: string): void;
};
const emits = defineEmits<emitsDef>();
const props = withDefaults(defineProps<propsDef>(), {
  sizeLimit: 5242880,
  sizeLimitText: "仅支持5M以内的图片文件。",
  fileTypes: () => ["image/jpeg", "image/jpg", "image/png"],
  title: "封面",
});
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

  :deep(.el-upload-list) {
    display: none;
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
