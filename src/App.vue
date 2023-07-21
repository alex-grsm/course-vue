<template>
    <ej-navbar />
    <div class="app">
        <router-view />
    </div>
</template>

<script>
import EjNavbar from '@/components/Navbar'
export default {
    components: {
        EjNavbar
    }
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
#app {
    max-width: 800px;
}
.app {
    padding: 20px;
    /* margin-left: auto; */
    /* margin-right: auto; */
}
</style>
