import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../page/Main.vue';
import Detail from '../page/Detail.vue';

Vue.use(VueRouter);

const routes = [
    {
        path : '/',
        redirect : '/home'
    },
    {
        path : '/home',
        component : Main
    },
    {
        path : '/country',
        component : Detail,
        
    }
]

export const router = new VueRouter({ // eslint-disable-line no-unused-vars
    mode : 'history',
    routes
});
