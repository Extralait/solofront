import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
// import NotFound from '../pages'

Vue.use(Router)

export default new Router({
    mode: 'history',
    // eslint-disable-next-line no-unused-vars
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [

        {
            path: '/Home',
            name:'Номе',
            component: Home
        },
        // {
        //     path: '/Interest',
        //     redirect: '/Home'
        // },
        {
            path: '/Interest',
            name: 'Interest',
            component: () => import('./views/Interest.vue'),
        },
        // {
        //     path: '/Photos',
        //     component: () => import('./views/Photo.vue'),
        // },
        // {
        //     path: '/Photos/*',
        //     redirect: '/Photos'
        // },
        {
            path: '*',
            redirect: '/Home'
        }
    ],
})