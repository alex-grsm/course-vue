import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue'
import Posts from '@/views/Posts'
import About from '@/views/About'
import SinglePost from '@/views/SinglePost'
import PostsStore from '@/views/PostsWithStore'
import PostsCompositionApi from '@/views/PostsCompositionApi'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts
  },
  {
    path: '/posts/:id',
    name: 'singlePost',
    component: SinglePost
  },
  {
    path: '/store',
    name: 'postsStore',
    component: PostsStore
  },
  {
    path: '/composition',
    name: 'postsCompositionApi',
    component: PostsCompositionApi
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
