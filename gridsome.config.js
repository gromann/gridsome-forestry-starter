// This is where project configuration and installed plugin options are located.
// Learn more: https://gridsome.org/docs/config

module.exports = {
  siteName: "the koi",
  siteUrl: `https://www.the-koi.com`,
  titleTemplate: `%s | The Koi`,
  siteDescription: "Software development, buissiness and personal groth blog",
  author: "Alexander Grossmann",
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "projects/**/*.md",
        typeName: "ProjectPost",
        resolveAbsolutePaths: true,
        remark: {
          externalLinksTarget: "_blank",
          externalLinksRel: ["nofollow", "noopener", "noreferrer"]
        }
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "journal/**/*.md",
        typeName: "JournalPost",
        resolveAbsolutePaths: true,
        remark: {
          externalLinksTarget: "_blank",
          externalLinksRel: ["nofollow", "noopener", "noreferrer"]
        }
      }
    },
    {
      use: 'klaro-gridsome',
      options: {
        privacyPolicy: '/privacy-policy/',
        cookieName: 'consent',
        translations: {
          en: {
            consentModal: {
              description: 'Here you can see and customize the information that we collect about you.',
            },
            googleAnalytics: {
              description: 'Website analytics powered by Google Analytics, allowing us to see how visitors use our website.'
            },
            purposes: {
              analytics: 'Analytics'
            },
          },
        },
        apps: [
          {
            name: 'googleAnalytics',
            default: true,
            title: 'Google Analytics',
            purposes: ['analytics'],
            cookies: [
              '_ga',
              '_gcl_au',
              '_gid',
              '_gat'
            ],
            required: false,
            optOut: true,
            onlyOnce: false
          }
        ]
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        config: {
          '/projects/*': {
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: '2021-03-10',
          },
          '/contact': {
            changefreq: 'monthly',
            priority: 0.4,
            lastmod: '2021-03-09',
          }
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-191213887-1'
      },}
  ],
  transformers: {
    remark: {
      plugins: ["@gridsome/remark-prismjs"]
    }
  }
};
