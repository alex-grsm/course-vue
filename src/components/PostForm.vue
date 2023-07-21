<script>
export default {
    name: 'EjPostForm',
    data() {
        return {
            post: {
                title: '',
                body: '',
            },
        }
    },
    methods: {
        createPost() {
            this.post.id = Date.now()
            this.$emit('create', this.post)
            this.post = {
                title: '',
                body: '',
            }
        },
    },
}
</script>

<template>
    <form class="form" @submit.prevent>
        <h4>Создание поста</h4>
        <ej-input
            v-focus
            v-model="post.title"
            placeholder="Название"
        />
        <ej-input
            v-model="post.body"
            placeholder="Описание"
        />
        <ej-button style="align-self: flex-end; margin-top: 15px;" @click="createPost">Создать</ej-button>
    </form>
</template>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
}
</style>
