<template>
    <footer class="footer">
        <cookie-law theme="dark-lime"></cookie-law>
        <div class="container">
            <span v-html="settings.footer" />
        </div>
    </footer>
</template>

<script>
    import CookieLaw from 'vue-cookie-law'

    export default {
        components: { CookieLaw },
        data() {
        return {
            settings: require("../../data/theme.json")
        }
    }
}
</script>

<style scoped>
.footer {
    font-size: 0.8rem;
    padding: 6rem 0;
}
</style>
