<script setup lang="ts">
import { mdiArrowUp } from "@mdi/js";
// import { useTheme } from 'vuetify'
const { theme } = useSettings();
const fab = ref(false);

// const theme = useTheme()

const onScroll = (e) => {
  if (typeof window === "undefined") return;
  const top = window.pageYOffset || e.target.scrollTop || 0;
  fab.value = top > 20;
};

onMounted(() => {
  if (!theme.value) {
    let theme_ = localStorage.getItem("wcp-theme");
    if (!theme_) {
      theme_ = "dark";
    }
    theme.value = theme_;
  }
});

const toTop = () => {
  if (typeof window === "undefined") return;
  window.scrollTo(0, 0);
};
</script>
<template>
  <v-app :theme="theme" v-show="theme">
    <LayoutsHeader> </LayoutsHeader>

    <v-main>
      <slot />
    </v-main>

    <LayoutsFooter> </LayoutsFooter>

    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      style="position: absolute; right: 16px; bottom: 16px"
      dark
      color="error"
      @click="toTop"
      :icon="mdiArrowUp"
    >
    </v-btn>
  </v-app>
</template>
