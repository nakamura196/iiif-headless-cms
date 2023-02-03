<script setup lang="ts">
const { data } = await useAsyncData("home", () => queryContent("/").findOne());
</script>
<template>
  <div>
    <div class="bg-main pt-10 pb-15">
      <v-container>
        <h1 class="text-center">
          <span>{{ $config.public.title }}</span>
        </h1>

        <p class="mt-5 text-center"><ContentRenderer :value="data" /></p>
      </v-container>
    </div>

    <v-container class="pa-10">
      <v-row>
        <v-col>
          <v-btn
            flat
            color="primary"
            size="x-large"
            block
            :href="`/mirador?manifest=/api/iiif/contentful/123/manifest`"
            >Contentful</v-btn
          >
        </v-col>
        <v-col>
          <v-btn
            flat
            color="primary"
            size="x-large"
            block
            :href="`/mirador?manifest=/api/iiif/microcms/123/manifest`"
            >microCMS</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
