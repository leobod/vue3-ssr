import { createApp } from "./main";
import { renderToString } from "@vue/server-renderer";
import { createRouter } from "./router";
import createStore from "./store";

export default function (ctx) {
  return new Promise(async (resolve, reject) => {
    const _data = {};
    const { app } = createApp();

    // 路由注册
    const router = createRouter("server");
    app.use(router);
    const store = createStore();
    app.use(store);

    console.log("cookie:user_name = ", ctx.cookies.get("user_name"));

    await router.push(ctx.url);
    await router.isReady();

    // 匹配路由是否存在
    const matchedComponents = router.currentRoute.value.matched.flatMap(
      (record) => Object.values(record.components)
    );
    // 不存在路由
    console.log(ctx.url);
    if (!matchedComponents.length) {
      return reject({ code: 404, url: ctx.url });
    }
    matchedComponents.map(async (component) => {
      if (component.fetchData) {
        await component.fetchData(_data);
      }
    });
    // 处理store
    Promise.all(
      matchedComponents.map(async (component) => {
        if (component.asyncData) {
          await component.asyncData(_data);
        }
      })
    )
      .then(async () => {
        let html = await renderToString(app);
        html += `<script>window._data = ${replaceHtmlTag(
          JSON.stringify(_data)
        )}</script>`;
        resolve(html);
      })
      .catch(() => {
        reject("");
      });
  });
}

/**
 * 替换标签
 * @param {*} html
 * @returns
 */
function replaceHtmlTag(html) {
  return html
    .replace(/<script(.*?)>/gi, "&lt;script$1&gt;")
    .replace(/<\/script>/g, "&lt;/script&gt;");
}
