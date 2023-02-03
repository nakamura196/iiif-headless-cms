<script lang="ts" setup>
const config = useRuntimeConfig()
 
useHead({
  titleTemplate: (titleChunk) => {
    const siteName = config.public.title
    return siteName !== titleChunk ? `${titleChunk} - ${siteName}` : siteName
  },
})
</script>
<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="#E64A19" :height="5" />
    <NuxtPage />
  </NuxtLayout>
</template>
