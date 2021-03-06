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

  export default {
components:{
  LatestJournals
},
  metaInfo () {
    return {
      title: this.$page.post.title,
      bodyAttrs: {
        style: `background-color: ${this.$page.post.project_bg_color ? this.$page.post.project_bg_color : 'var(--color-base)'}; color: ${this.$page.post.project_fg_color ? this.$page.post.project_fg_color : 'var(--color-contrast)'}`
      }
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
