import { createStore as _createStore } from 'vuex';
import {request} from './utils/request';

// 对外导出一个仓库
export default function createStore() {
    return _createStore({
        state: {
            // 状态数据
            items: {}
        },
        mutations: {
            SET_ITEM (state, { key, value }) {
                state.items[key] = value
            },
        },
        actions: {
            setItem: function ({ commit }, val) {
                commit('SET_ITEM', { key: val.key, value: val.value })
            }
        },
        modules: {}
    });
}
