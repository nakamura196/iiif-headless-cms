import en from "./locales/en.json";
import ja from "./locales/ja.json";

const getBaseUrl = () => {
  const environment = process.env.APP_MODE;

  switch (environment) {
    /*
    case "staging":
      return "";
    case "development":
      return "";
    */
    case "production":
      return process.env.baseURL_prod; // "https://nakamura196.github.io";
    default:
      return process.env.baseURL; // "";
  }
};

const baseURL = getBaseUrl();

const title = process.env.title;
const description = process.env.description;
const keywords = process.env.keywords;
const app_baseURL = process.env.baseURL;

const image = "https://img.webcatplus.jp/favicon.ico";

export default defineNuxtConfig({
  runtimeConfig: {
    footer: process.env.footer,
    microcms: {
      serviceDomain: process.env.microcms_serviceDomain,
      apiKey: process.env.microcms_apiKey,
    },
    contentful: {
      space: process.env.contentful_space,
      accessToken: process.env.contentful_accessToken,
    },
    public: {
      // hostname,
      baseURL,
      app_baseURL,
      
      title,
      description
    },
  },
  modules: ["@nuxt/content", "@nuxtjs/i18n", "nuxt-jsonld"],
  i18n: {
    locales: ["ja", "en"], // used in URL path prefix
    defaultLocale: "ja",
    // add `vueI18n` option to `@nuxtjs/i18n` module options
    vueI18n: {
      legacy: false,
      locale: "ja",
      messages: {
        ja,
        en,
      },
    },
  },
  app: {
    baseURL: app_baseURL, // process.env.baseURL, // /<reponame>
    head: {
      htmlAttrs: {
        lang: "ja",
      },
      title,
      meta: [
        { charset: "utf-8" },
        { "http-equiv": "x-ua-compatible", content: "ie=edge" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "format-detection",
          content: "telephone=no, email=no, address=no",
        },
        // SEO関連
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        // ogp関連
        {
          property: "og:site_name",
          content: title,
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: baseURL },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: title,
        },
        {
          property: "og:image",
          content: image,
        },
        {
          property: "og:locale",
          content: "ja_JP",
        },
        { name: "twitter:card", content: "summary" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: image,
        },
      ],
      /*
      script: [
        { src: 'https://cse.google.com/cse.js?cx=4559167e9a750478b', async: true  }
      ],
      */
    },
  },
  css: [
    "vuetify/lib/styles/main.sass",
    // "mdi/css/materialdesignicons.min.css",
    "@/assets/styles/main.css",
  ],

  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  }
});
