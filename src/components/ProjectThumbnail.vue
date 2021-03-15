<template>
    <div class="container">
        <g-image
                :src="project.thumbnail"
                :alt="project.title"
                class="thumbnail"
                @mouseover="imgHover = true"
                @mouseout="imgHover = false"
        />
        <div class="description" v-if="imgHover">
            Article description + source
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return{
        imgHover
    }},
    props: {
        project: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.projects {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4rem;
}
.project {
  grid-column: auto / span 2;
  text-align: center;
}
.project-link {
  text-decoration: none;
}
.container {
    position: relative;
    text-align: center;
    color: white;
}
.thumbnail {
  height: 560px;
  object-fit: cover;
  transition: all 0.15s ease;
  box-shadow: 0 0 40px -20px rgba(0,0,0,0.25);
}
.project-title {
  font-size: 1rem;
  color: var(--color-contrast);
  margin: 2rem 0 1rem 0;
}
.categories {
  font-size: 0.8rem;
  color: var(--color-contrast-1);
}
.category {
  margin-right: 0.8rem;
}
.category:last-of-type {
  margin: 0;
}
.project:hover .thumbnail {
  transform: scale(1.02);
  box-shadow: 0 20px 40px -20px rgba(0,0,0,0.25);

    webkit-filter: blur(12px); /* Chrome, Safari, Opera */
    filter: blur(12px);
}

@media (min-width: 920px) {
  .project {
    grid-column: auto / span 1;
  }
  .project:nth-child(3n+1) {
    grid-column: auto / span 2;
  }
}
/* Centered text */
.description {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
