# Example
## Use it with Vue Component
```
<script setup>
import { UploadBaodian } from "ossuploadertal"
const cover = ref("")
const senderInstance = new InterceptorBase()
</script>
<template>
    <UploadBaodian v-model="cover" :sender="senderInstance"></UploadBaodian>
</template>
```
## Use it with API
```
import { upload } from "ossuploadertal"
const senderInstance = new InterceptorBase()
const file = await upload({file:new Blob([])},senderInstance);
```