<template>
    <div class="navbar">
        <div class="logo">
            <router-link :to="{ name: 'main' }">
                <img :src="logoPath" alt="Logo" />
            </router-link>
        </div>
        <div class="navbar__btns">
            <ej-button @click="goToPosts">ПОСТЫ</ej-button>
            <router-link class="nav-link" :to="{ name: 'posts' }">
                Посты
            </router-link>
            <router-link class="nav-link" :to="{ name: 'about' }">
                About
            </router-link>
            <router-link class="nav-link" :to="{ name: 'postsStore' }">
                PostsStore
            </router-link>
            <router-link class="nav-link" :to="{ name: 'postsCompositionApi' }">
                PostsCompositionApi
            </router-link>
        </div>
    </div>
</template>

<script>
import EjButton from './UI/EjButton.vue'
export default {
    name: 'EjNavbar',
    components: { EjButton },
    data() {
        return {
            logoPath: require('@/assets/logo.png'),
        }
    },
    methods: {
        goToPosts() {
            this.$router.push({ name: 'posts' })
        },
    },
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}
.navbar__btns {
    margin-left: auto;
}
.logo {
    img {
        max-width: 40px;
        height: auto;
    }
}
.nav-link {
    padding: 5px 10px;
    text-decoration: none;
    color: #000;
    &:hover {
        text-decoration: underline;
    }
}
</style>
