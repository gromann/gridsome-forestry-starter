<template>
  <Layout>
    <div class="container">
      <Hero />
      <ProjectsGrid :projects="$page.projects.edges" />
    </div>
    <LatestJournals :journals="$page.projects.edges" />
  </Layout>
</template>

<page-query>
query Posts {
	projects: allProjectPost {
    edges {
      node {
        id
        date (format: "YYYY")
        title
        categories
        thumbnail (quality: 90)
        path
      }
    }
  },
  journals: allProjectPost (perPage: 4) {
    edges {
      node {
        id
        path
        title
      }
    }
  }
}
</page-query>

<script>
import Hero from "@/components/Hero"
import ProjectsGrid from "@/components/ProjectsGrid"
import LatestJournals from "@/components/LatestJournals"

export default {
  components: {
    Hero,
    ProjectsGrid,
    LatestJournals
  },
  data () {
    return{
      description: "Software development, buissiness and personal groth blog." +
              "I want to use my knoledge to help you rech your goals. " +
              " This wil varry from vue.js and .net core development, Creating JAMStack apps over to hosting with AWS and Azure" +
              "to motivation and investing. So letzt start reading, I'm sure you will get some value from it!"
    }
  },
  metaInfo () {
    return {
      title: "Welcome to my Blog",
      meta: [
        { name: 'description', content: this.description},
        { key:"og:description",  property: "og:description", content: this.description},
        { property: 'og:title', content: "Welcome to my Blog"},
        { property: 'og:site_name', content: 'the-koi.com/'},
        {property: 'og:url', content: 'https://the-koi.com/'},
      ],
    }
  }
}
</script>
