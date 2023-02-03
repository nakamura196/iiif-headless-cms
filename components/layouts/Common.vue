<script setup lang="ts">
interface PropType {
  title: string;
  items?: any[];
}

const props = withDefaults(defineProps<PropType>(), {
  title: () => "",
  items: () => [],
});
</script>
<template>
  <div class="mb-15">
    <LayoutsBreadCrumbs v-if="items.length > 0" :items="items"></LayoutsBreadCrumbs>
    <v-container fluid class="mt-5">
      <h1 class="mb-5">{{ title }}</h1>
      <slot></slot>
    </v-container>
  </div>
</template>
