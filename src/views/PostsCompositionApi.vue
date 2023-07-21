<template>
    <div>
        <h1>Страница с постами</h1>
        <ej-input v-focus v-model="searchQuery" placeholder="Поиск..." />
        <div class="app__btns">
            <ej-button> Создать пост </ej-button>
            <ej-select v-model="selectedSort" :options="sortOptions" />
        </div>
        <ej-dialog v-model:show="dialogVisibility">
            <ej-post-form />
        </ej-dialog>
        <ej-post-list
            :posts="sortedAndSearchedPosts"
            v-if="!isLoading"
        />
        <div v-else>Loading...</div>
    </div>
</template>

<script>
import EjPostForm from '@/components/PostForm';
import EjPostList from '@/components/PostList';
import { usePosts } from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';

export default {
    components: {
        EjPostForm,
        EjPostList,
    },
    data() {
        return {
            dialogVisibility: false,
            sortOptions: [
                { value: 'title', name: 'По названию' },
                { value: 'body', name: 'По содержимому' },
            ],
        };
    },
    setup(props) {
        const { posts, totalPages, isPostsLoading } = usePosts(10);
        const { sortedPosts, selectedSort } = useSortedPosts(posts);
        const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);

        return {
            posts,
            totalPages,
            isPostsLoading,
            sortedPosts,
            selectedSort,
            searchQuery,
            sortedAndSearchedPosts,
        };
    },
};
</script>

<style lang="scss" scoped>
.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}
.page__wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border: 1px solid black;
    padding: 10px;
    cursor: pointer;
}
.current-page {
    border: 2px solid teal;
}
.observer {
    height: 30px;
    background: green;
}
</style>
