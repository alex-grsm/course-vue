<template>
    <div v-if="posts.length > 0" class="post-container">
        <h3>Список постов</h3>
        <TransitionGroup name="fade">
            <ej-post-item
                v-for="post in posts"
                :key="post.id"
                :post="post"
                @remove="$emit('remove', post)"
            />
        </TransitionGroup>
    </div>
    <h2 v-else style="color: red">Список постов пуст</h2>
</template>

<script>
import EjPostItem from '@/components/PostItem';

export default {
    name: 'EjPostList',
    components: {
        EjPostItem,
    },
    props: {
        posts: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
.post-container {
    position: relative;
}
/* 1. Оголошення переходу */
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. Оголошення входу і виходу зі стану */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
}

/* 3. Переконайтеся, що елементи, які вилучаються з потоку макету
      є видалені, щоб анімації були розраховані коректно. */
.fade-leave-active {
    position: absolute;
}
</style>
