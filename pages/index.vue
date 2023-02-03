<script setup lang="ts">
const localePath = useLocalePath();

const { data } = await useAsyncData("home", () => queryContent("/").findOne());
</script>
<template>
  <div>

    <div class="bg-main pt-10 pb-15">
      <v-container>
        <h1 class="text-center">
          <span>{{ $config.public.title }}</span>
        </h1>

        <!-- <p class="mt-5 text-center">{{$config.public.description}}</p> -->

        <p class="mt-5 text-center">
          <v-btn color="error" flat :to="localePath({ name: 'search' })"
            >試す</v-btn
          >
        </p>
      </v-container>
    </div>

    <v-container class="my-10">
      <ContentRenderer :value="data" />
    </v-container>

    <div class="bg-c_grey">
      <v-container class="pa-10">
        <p class="mb-5">
          <b>お知らせ</b>
          <span class="ml-5"
            ><nuxt-link :to="localePath({ name: 'news' })"
              ><small>すべて</small></nuxt-link
            ></span
          >
        </p>

        <OrganismsNewsList></OrganismsNewsList>
      </v-container>
    </div>
  </div>
</template>
