<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import {ref,shallowRef,useAttrs,onMounted,watchEffect,onBeforeUnmount} from 'vue'
defineOptions({
  inheritAttrs: false,
})
const props = defineProps({
  moduleKey: {
    type: String,
    default: 'default',
  },
  asyncComp: Promise,
})
const reactContainerEl = ref()
const reactComp = shallowRef()
const root = shallowRef()
const attrs = useAttrs()
onMounted(async () => {
  reactComp.value = undefined
  const module = await props.asyncComp
  reactComp.value = module[props.moduleKey]
})

watchEffect(() => {
  const rcEl = reactContainerEl.value
  if (!rcEl) {
    return
  }
  root.value = createRoot(rcEl)
})

watchEffect(() => {
  const rC = reactComp.value
  const rRoot = root.value
  if (!rC || !rRoot) {
    return
  }
  const rawAttrs = {}
  Object.keys(attrs).forEach((key) => {
    rawAttrs[key] = toRaw(attrs[key])
  })
  root.value.render(createElement(rC, rawAttrs))
})
onBeforeUnmount(() => {
  if (root.value) {
    root.value.unmount()
    root.value = undefined
    reactComp.value = undefined
  }
})
</script>

<template>
  <div ref="reactContainerEl" />
</template>

<style scoped>

</style>
