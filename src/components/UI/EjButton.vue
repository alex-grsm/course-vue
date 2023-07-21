<template>
    <button class="btn">
        <slot />
    </button>
</template>

<script>
    export default {
        name: 'EjButton'
    }
</script>

<style lang="scss" scoped>
.btn {
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
    cursor: pointer;
}
</style>