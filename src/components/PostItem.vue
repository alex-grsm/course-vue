<template>
    <div class="post">
        <div>
            <div>{{ post.id }}</div>
            <div><strong>Название:</strong> {{ post.title }}</div>
            <div><strong>Описание:</strong> {{ post.body }}</div>
        </div>
        <div class="post__btns">
            <ej-button @click="goToPost">Открыть</ej-button>
            <ej-button @click="$emit('remove', post)">Удалить</ej-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EjPostItem',
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    methods: {
        goToPost() {
            this.$router.push({
                name: 'singlePost',
                params: { id: this.post.id },
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post__btns {
    display: flex;
}
</style>
