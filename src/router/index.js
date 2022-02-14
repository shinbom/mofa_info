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
        name : 'home',
        path : '/home',
        component : Main
    },
    {
        name : 'country',
        path : '/country',
        component : Detail,
        props : true
    }
]

export const router = new VueRouter({ // eslint-disable-line no-unused-vars
    mode : 'history',
    routes
});

