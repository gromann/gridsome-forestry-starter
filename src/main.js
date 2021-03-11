import DefaultLayout from "~/layouts/Default.vue";
import settings from "../data/theme.json";
import config from '../gridsome.config'


import "@/assets/code-highlight.css"

export default function(Vue, { head }) {
  // seo stuff
  let copyRightNotice = `\u00a9 ${
      config.author
  }, ${new Date().getFullYear()}. All rights reserved`

  head.meta.push(
      {
        key: 'keywords',
        name: 'keywords',
        content: config.keywords
      },
      {
        name: 'author',
        content: config.author
      },
      {
        key: 'description',
        name: 'description',
        content: config.siteDescription
      },

      { name: 'copyright', content: copyRightNotice},
      { key:"og:type",  property: "og:type", content: 'article' },
      { key:"og:description",  property: "og:description", content: config.siteDescription },
      { key:"og:image", property: "og:image", content: 'https://www.the-koi.com/logo.svg' },
      { property: "og:site_name", content: config.siteName }
  );


  Vue.component("Layout", DefaultLayout);
  head.bodyAttrs = {
    class: settings.dark_mode ? "dark" : ""
  };
}
