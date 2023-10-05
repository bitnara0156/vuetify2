export default {
  /*
   ** Headers of the page
   ** Doc: https://vue-meta.nuxtjs.org/api/#metainfo-properties
   */
  head: {
    title: "My Site",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "My Site on CodeSandBox"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Nuxt.js modules
   ** Doc: https://nuxtjs.org/guide/modules
   */
  modules: [
    // TODO: Remove it if you want to eject from codeSandbox
    "./codesandbox",
    "@nuxtjs/axios",
    "@nuxtjs/auth"
  ],
  devModules: ["@nuxtjs/vuetify"],
  axios: {},
  plugins: [{ src: "~/plugins/vue-pdf.js", ssr: false, mode: "client" }],

  /*
   ** Vuetify options
   ** Doc: https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#41B883"
        },
        dark: {
          primary: "#34495E"
        }
      }
    }
  },
  build: {
    vendor: ["three", "vue-three"],
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.output.globalObject = "this";
        this.HTMLElement =
          typeof window === "undefined" ? Object : window.HTMLElement;
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "/sessions", method: "post", propertyName: "token" },
          logout: false,
          user: {
            url: "/sessions/user",
            method: "get",
            propertyName: "data.attributes"
          }
        },
        // tokenRequired: true,
        tokenType: ""
      }
    },
    redirect: {
      home: false,
      callback: false,
      logout: false
    }
  }
};
