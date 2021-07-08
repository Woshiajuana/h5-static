
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex);

const modules = (s => {
    const r = {};
    s.keys().forEach(k => r[k.split('/')[1]] = s(k).default);
    return r;
})(require.context('./modules/', true, /\.js$/));

export default new Vuex.Store({
    state: {},
    mutations,
    actions,
    modules
});
