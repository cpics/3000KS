import Vue from 'vue';
import Vuex from 'vuex';
import cookies from './common/utils/cookies';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: null,
    },
    mutations: {
        add(state) {
            state.a++;
            // console.log(state.a);
        },
        setUserInfo(state, userInfo) {
            if (userInfo) {
                state.userInfo = userInfo;
                cookies.set('userInfo', userInfo, {
                    path: '/',
                    // domain: document.domain,
                    expires: 7,
                });
                // console.log(state.userInfo);
            } else if (cookies.get('userInfo')) {
                state.userInfo = cookies.get('userInfo');
                // console.log(state.userInfo);
            }
        },
        delUserInfo(state) {
            cookies.remove('userInfo');
            state.userInfo = null;
        },
    },
    actions: {},
});
