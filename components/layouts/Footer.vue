<script setup lang="ts">
const menus: any[] = [
  /*
  {
    label: "公開コンテンツの概要",
    to: "/page/introduction",
  },
  */
];
</script>

<template>
  <v-footer class="pa-0">
    <v-card elevation="0" rounded="0" width="100%" color="main">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col v-for="(item, key) in menus" cols="6" :sm="3">
              <nuxt-link
                style="color: inherit"
                depressed
                :to="item.to"
                exact
                >{{ $t(item.label) }}
              </nuxt-link>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="my-5 text-center" v-html="$config.footer">
      </v-card-text>
    </v-card>
  </v-footer>
</template>
