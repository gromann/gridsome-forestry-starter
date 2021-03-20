import DefaultLayout from "~/layouts/Default.vue";
import settings from "../data/theme.json";
import config from '../gridsome.config'
import Ads from 'vue-google-adsense'


import "@/assets/code-highlight.css"

export default function(Vue, { head }) {
  // seo stuff
  let copyRightNotice = `\u00a9 ${
      config.author
  }, ${new Date().getFullYear()}. All rights reserved`

  head.meta.push(
/*      {
        key: 'keywords',
        name: 'keywords',
        content: config.keywords
      },*/
      {
        name: 'author',
        content: config.author
      },

      { name: 'copyright', content: copyRightNotice},
      { key:"og:type",  property: "og:type", content: 'article' },
      { key:"og:image", property: "og:image", content: 'https://www.the-koi.com/logo.svg' },
      { property: "og:site_name", content: config.siteName }
  );

    head.script.push({
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        async: true,
        dataAdClient: "ca-pub-8164918311331640"
    });
    head.script.push({
        innerHTML: '!function(c,h,i,m,p){m=c.createElement(h),' +
            'p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script",' +
            '"https://chimpstatic.com/mcjs-connected/js/users/ee93ba2889dc937335d6b7238/13f57747b638e0690682a59e3.js");',
        id: "mcjs"
    });

  Vue.use(require('vue-script2'));

  Vue.use(Ads.Adsense);
  Vue.use(Ads.InArticleAdsense);
  Vue.use(Ads.InFeedAdsense);

  Vue.component("Layout", DefaultLayout);
  head.bodyAttrs = {
    class: settings.dark_mode ? "dark" : ""
  };
}
