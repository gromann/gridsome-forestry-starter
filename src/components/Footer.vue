<template>
    <footer class="footer">
<!--        <cookie-law theme="dark-lime"></cookie-law>-->
        <div class="container">
            <span v-html="settings.footer" />
        </div>
    </footer>
</template>

<script>
    // import CookieLaw from 'vue-cookie-law'
    // import CookieLaw from "../../"

    export default {
        // components: { CookieLaw },
        data() {
        return {
            settings: require("../../data/theme.json")
        }
    },
        // handle cookies
        mounted() {
            document.addEventListener('consentUpdate', this.consentToggle)
        },
        beforeDestroy() {
            document.removeEventListener('consentUpdate', this.consentToggle)
        },
        methods: {
            consentToggle(event) {
                // only is app is google analytics
                if (event.detail.app === 'googleAnalytics') {
                    if (event.detail.consent) {
                        // if user consent is true
                        this.$ga.enable()
                    } else {
                        // if user consent is false
                        // this.$ga.disable()
                    }
                }
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
