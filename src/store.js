import { createStore as _createStore } from 'vuex';
import {request} from './utils/request';

// 对外导出一个仓库
export default function createStore() {
    return _createStore({
        state: {
            // 状态数据
            msg: []
        },
        mutations: {
            // 同步数据
            SET_MSG(state, mgs=[]){
                state.msg = mgs;
            }
        },
        actions: {
            setMsg({commit}, val) {
                commit('SET_MSG', val);
            },
            // 异步数据
            asyncSetMsg({commit}){
                return new Promise((resolve) => {
                    request.get('/api/news').then(res => {
                        commit('SET_MSG', res);
                        resolve();
                    })
                })
            },
        },
        modules: {}
    });
}
