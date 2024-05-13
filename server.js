const Koa = require('koa')
const { renderToString } = require('@vue/server-renderer')
const path = require('path');
const manifest = require('./dist/ssr-manifest.json')
const appPath = path.join(__dirname, './dist', manifest['server.js'])
const createApp = require(appPath).default;
const fs = require('fs');
const Mount = require('koa-mount');
const Static = require('koa-static')

const app = new Koa()
app.use(Mount('/',Static('./dist')))

// 获取模板
const indexTemplate = fs.readFileSync(
    path.join(__dirname, './dist/index.template.html'),
    'utf-8'
);

// 获取 index.template.html
app.use(async (ctx) => {
    try {
        const appContent = await createApp(ctx);
        const html = indexTemplate
            .toString()
            .replace('<div id="app">', `<div id="app">${appContent}`)
        ctx.body = html
    } catch (e) {
        console.log(e);
        if (e.code == 404) {
            ctx.body = '页面去火星了，找不到了，404啦'
        } else {
            ctx.throw(500, e.stack)
        }
    }
})
const port = 3001
app.listen(port, () => {
    console.log(`server is listening in ${port}`)
});
