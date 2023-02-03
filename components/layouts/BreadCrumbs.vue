<script setup lang="ts">
import {mdiChevronRight} from '@mdi/js'

interface Item {
  title: string;
  disabled: boolean;
  href: string;
}

interface PropType {
  items?: Item[];
}

withDefaults(defineProps<PropType>(), {
  items: () => [],
});
</script>

<template>
  <v-sheet class="bg-c_grey">
    <v-container fluid class="py-2">
      <v-breadcrumbs class="py-0 mx-0 px-0" :items="items">
        <template v-slot:divider>
          <v-icon :icon="mdiChevronRight"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-container>
  </v-sheet>
</template>
