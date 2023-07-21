<template>
    <div>
        <h1>Страница с постами</h1>
        <ej-input v-focus v-model="searchQuery" placeholder="Поиск..." />
        <div class="app__btns">
            <ej-button @click="showDialog"> Создать пост </ej-button>
            <ej-select v-model="selectedSort" :options="sortOptions" />
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
        <!-- <div class="page__wrapper">
            <div
                v-for="pageNumber in totalPages"
                :key="pageNumber"
                class="page"
                :class="{ 'current-page': page === pageNumber }"
                @click="changePage(pageNumber)"
            >
                {{ pageNumber }}
            </div>
        </div> -->
    </div>
    <div v-intersection="loadMorePosts" class="observer"></div>
</template>

<script>
import axios from 'axios'
import EjPostForm from '@/components/PostForm'
import EjPostList from '@/components/PostList'

export default {
    components: {
        EjPostForm,
        EjPostList,
    },
    data() {
        return {
            posts: [],
            dialogVisibility: false,
            isLoading: false,
            searchQuery: '',
            selectedSort: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                { value: 'title', name: 'По названию' },
                { value: 'body', name: 'По содержимому' },
            ],
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post)
            this.dialogVisibility = false
        },
        removePost(post) {
            this.posts = this.posts.filter((p) => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisibility = true
        },
        // changePage(pageNumber) {
        //     this.page = pageNumber
        // },
        async fetchPosts() {
            try {
                this.isLoading = true
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts/',
                    {
                        params: {
                            _page: this.page,
                            _limit: this.limit,
                        },
                    }
                )
                this.totalPages = Math.ceil(
                    response.headers['x-total-count'] / this.limit
                )
                this.posts = response.data
            } catch (e) {
                alert('error')
            } finally {
                this.isLoading = false
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts/',
                    {
                        params: {
                            _page: this.page,
                            _limit: this.limit,
                        },
                    }
                )
                this.totalPages = Math.ceil(
                    response.headers['x-total-count'] / this.limit
                )
                this.posts = [...this.posts, ...response.data]
            } catch (error) {
                alert('error')
            }
        },
    },
    mounted() {
        this.fetchPosts()
        // const options = {
        //     rootMargin: '0px',
        //     threshold: 1.0,
        // }
        // const callback = (entries, observer) => {
        //     if (entries[0].isIntersecting && this.page < this.totalPages) {
        //         this.loadMorePosts()
        //     }
        // }
        // const observer = new IntersectionObserver(callback, options)
        // observer.observe(this.$refs.observer)
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) =>
                post1[this.selectedSort]?.localeCompare(
                    post2[this.selectedSort]
                )
            )
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter((post) =>
                post.title
                    .toLowerCase()
                    .includes(this.searchQuery.toLowerCase())
            )
        },
    },
    watch: {
        // page() {
        //     this.fetchPosts()
        // }
    },
}
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
