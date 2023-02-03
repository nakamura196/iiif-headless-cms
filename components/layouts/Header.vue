<script setup lang="ts">
import { mdiBrightness6, mdiChevronDown } from "@mdi/js";
import { mdiMagnify } from "@mdi/js";

const { theme } = useSettings();

const localePath = useLocalePath();

const changeTheme = (theme_: string) => {
  theme.value = theme_;
  localStorage.setItem("wcp-theme", theme_);
};
</script>

<template>
  <v-app-bar color="main" flat :absolute="true">
    <v-app-bar-title>
      <nuxt-link
        :to="localePath({ name: 'index' })"
        style="text-decoration: none; color: inherit"
      >
        {{ $config.public.title }}
      </nuxt-link>
    </v-app-bar-title>

    <client-only>
      <v-list-item>
        <v-list-item-title>
          <client-only>
            <v-menu offset-y>
              <template v-slot:activator="{ props }">
                <v-btn variant="text" v-bind="props">
                  {{ theme === "dark" ? "ダークモード" : "ライトモード" }}
                  <v-icon> {{ mdiChevronDown }} </v-icon>
                </v-btn>
              </template>
              <v-card flat>
                <v-list>
                  <v-list-item
                    active-color="primary"
                    :active="theme === 'dark'"
                    @click="changeTheme('dark')"
                    >ダークモード</v-list-item
                  >
                  <v-list-item
                    active-color="primary"
                    :active="theme === 'light'"
                    @click="changeTheme('light')"
                    >ライトモード</v-list-item
                  >
                </v-list>
              </v-card>
            </v-menu>
          </client-only>
        </v-list-item-title>
      </v-list-item>
    </client-only>
  </v-app-bar>
</template>
