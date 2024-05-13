import { createApp } from './main.js'
import { createRouter } from './router'
import createStore from './store';
const router = createRouter('client')

const { app } = createApp()

app.use(router)

const store = createStore();
// 判断window.__INITIAL_STATE__是否存在，存在的替换store的值
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}
app.use(store)

router.isReady().then(() => {
    app.mount('#app', true)
});
