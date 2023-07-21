<template>
    <div>
        <!-- <h1>{{ $store.state.postModule.limit }}</h1> -->

        <!-- <h1>{{ $store.state.isAuth ? 'Пользователь авторизован' : 'Авторизуйтесь, что бы войти'}}</h1>
        <h1>{{ $store.getters.doubleLikes }}</h1>
        <div>
            <ej-button @click="$store.commit('incrementLikes')">Like</ej-button>
            <ej-button @click="$store.commit('decrementLikes')">Dizlike</ej-button>
        </div> -->

        <h1>Страница с постами</h1>
        <ej-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..." />
        <div class="app__btns">
            <ej-button @click="showDialog"> Создать пост </ej-button>
            <ej-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
        </div>
        <ej-dialog v-model:show="dialogVisibility">
            <ej-post-form @create="createPost" />
        </ej-dialog>
        <ej-post-list
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isLoading"
        />
        <div v-else>Loading...</div>
    </div>
    <div v-intersection="loadMorePosts" class="observer"></div>
</template>

<script>
import EjPostForm from '@/components/PostForm';
import EjPostList from '@/components/PostList';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    components: {
        EjPostForm,
        EjPostList,
    },
    data() {
        return {
            dialogVisibility: false,
        };
    },
    methods: {
        ...mapMutations({
            setPage: 'postModule/setPage',
            setSearchQuery: 'postModule/setSearchQuery',
            setSelectedSort: 'postModule/setSelectedSort',
        }),
        ...mapActions({
            loadMorePosts: 'postModule/loadMorePosts',
            fetchPosts: 'postModule/fetchPosts',
        }),
        createPost(post) {
            this.posts.push(post);
            this.dialogVisibility = false;
        },
        removePost(post) {
            this.posts = this.posts.filter((p) => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisibility = true;
        },
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        ...mapState({
            posts: (state) => state.postModule.posts,
            isLoading: (state) => state.postModule.isLoading,
            selectedSort: (state) => state.postModule.selectedSort,
            searchQuery: (state) => state.postModule.searchQuery,
            page: (state) => state.postModule.page,
            limit: (state) => state.postModule.limit,
            totalPages: (state) => state.postModule.totalPages,
            sortOptions: (state) => state.postModule.sortOptions,
        }),
        ...mapGetters({
            sortedPosts: 'postModule/sortedPosts',
            sortedAndSearchedPosts: 'postModule/sortedAndSearchedPosts',
        }),
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
