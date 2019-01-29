import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'projects',
            component: () => import('./views/Projects.vue'),
            meta: { auth: true }
        },
        {
            path: '/add-project',
            name: 'add-project',
            component: () => import('./views/AddOrEditProject.vue'),
            meta: { auth: true }
        },
        {
            path: '/projects/:id',
            name: 'edit-project',
            component: () => import('./views/AddOrEditProject.vue'),
            meta: { auth: true }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/Register.vue'),
            meta: { auth: false }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue'),
            meta: { auth: false }
        }
    ]
})
