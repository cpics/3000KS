import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

import Login from './view/login/login.vue';
import Houtai from './view/houtai/houtai.vue';
import Index from './view/houtai/children/index/index.vue';
import Shebei from './view/houtai/children/shebei/shebei.vue';
import SbList from './view/houtai/children/shebei/children/list/list.vue';
import quyu from './view/houtai/children/shebei/children/quyu/quyu.vue';
import zd from './view/houtai/children/shebei/children/zd/zd.vue';
import SbDetail from './view/houtai/children/shebei/children/detail/detail.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/houtai',
            name: 'houtai',
            redirect: '/houtai/index',
            component: Houtai,
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: Index,
                },
                {
                    path: 'shebei',
                    name: 'shebei',
                    component: Shebei,
                    redirect: '/houtai/shebei/quyu',
                    children: [
                        {
                            path: 'list/:id',
                            name: 'sbList',
                            component: SbList,
                        },
                        {
                            path: 'detail/:id',
                            name: 'sbDetail',
                            component: SbDetail,
                        },
                        {
                            path: 'quyu',
                            name: 'quyu',
                            component: quyu,
                        },
                        {
                            path: 'zd/:id',
                            name: 'zd',
                            component: zd,
                        },
                    ],
                },
            ],
        },
        {
            path: '*',
            redirect: '/houtai/index',
        },
    ],
});

export default router;
