<template>
  <Layout>
    <div class="project">

      <div class="container">

        <div class="project-header">
          <h1 class="project-title" v-html="$page.post.title" />
          <div class="project-info">
            <span v-html="$page.post.sumary" class="project-sumary" />
            <div class="categories-container">
              <div class="categories">
                <span class="label">Categories</span>
                <span
                  class="category"
                  v-for="(category, index) in $page.post.categories"
                  :key="index"
                  v-text="category"
                />
              </div>
            </div>
            <div class="year-container">
              <span class="label">Year</span>
              <div v-html="$page.post.date"/>
            </div>
          </div>
        </div>
        <InArticleAdsense
                data-ad-client="ca-pub-8164918311331640"
                >
        </InArticleAdsense>
        <div id="adsgoeshere" style="background: #1d1f29; padding-top:60px; text-align: center;" v-html="adsenseContent"></div>

        <div v-html="$page.post.content" class="content" />
      </div>
    </div>
<!--    related section -->
    <LatestJournals :journals="$page.journals.edges" />

  </Layout>
</template>

<page-query>
query ProjectPost ($path: String!) {
  post: projectPost (path: $path) {
    title
    sumary
    thumbnail
    date (format: "YYYY")
    content
    categories
    project_bg_color
    project_fg_color
  }

  journals: allProjectPost(perPage: 4) {
  edges {
    node {
      id
      path
      title
      excerpt
      }
    }
  }
}

</page-query>

<script>
  import LatestJournals from "@/components/LatestJournals"
  import config from "../../gridsome.config";

  export default {
    data () {
      return{
        adsenseContent: ''
      }
    },
components:{
  LatestJournals
},
    mounted () {
      // this.adsenseContent = document.getElementById('divadsensedisplaynone').innerHTML

      let externalScript = document.createElement('script')
      externalScript.setAttribute('src', 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js')
      externalScript.setAttribute('data-name', 'BMC-Widget')
      externalScript.setAttribute('data-id', 'thekoi')
      externalScript.setAttribute('data-description', 'Support me on Buy me a coffee!')
      externalScript.setAttribute('data-message', 'Hey 👋 I hope I could save you some time. If you find my articles useful and want to support me you could buy me a coffee.')
      externalScript.setAttribute('data-color', '#79D6B5')
      externalScript.setAttribute('data-position', 'Right')
      externalScript.setAttribute('data-x_margin', '18')
      externalScript.setAttribute('data-y_margin', '18')
      document.head.appendChild(externalScript)

    },

  metaInfo () {
    return {
      title: this.$page.post.title,
      meta: [
        { name: 'description', content: this.$page.post.sumary},
        { key:"og:description",  property: "og:description", content: this.$page.post.sumary },
        { key:"og:image", property: "og:image", content: this.$page.post.thumbnail },
        { property: 'og:title', content: this.$page.post.title},
        { property: 'og:site_name', content: 'the-koi.com/'+ this.$page.post.title},
        {
          key: 'keywords',
          name: 'keywords',
          content: this.$page.post.categories
        },
        // {property: 'og:url', content: 'https://epiloge.com/@' + this.userData.username},
      ],
      bodyAttrs: {
        style: `background-color: ${this.$page.post.project_bg_color ? this.$page.post.project_bg_color : 'var(--color-base)'}; color: ${this.$page.post.project_fg_color ? this.$page.post.project_fg_color : 'var(--color-contrast)'}`
      },
    }
  }
}
</script>

<style scoped>
.project-header {
  padding: 20vh 0 4rem 0;
}
.project-title {
  font-size: 4rem;
  margin: 0 0 4rem 0;
  padding: 0;
}
.project-sumary {
  font-size: 2rem;
  margin: 0 0 4rem 0;
  color: rgba(0, 0, 0, 0.64);
}
.project-info {
  display: flex;
  flex-wrap: wrap;
  font-size: 1.15rem;
}
.project-info > div {
  margin-right: 4rem;
}
.project-info > div:last-of-type {
  margin: 0;
}
.category:after {
  content: ', '
}
.category:last-of-type:after {
  content: '';
}
.content {
  font-size: 1.4rem;
}
p {
  line-height: 1.5;
  font-size: 1.5rem;
}
h2 {
  font-size: 2.25rem;
}
h3 {
  font-size: 2rem;
}
h4, h5, h6 {
  font-size: 1.3rem;
}
</style>
