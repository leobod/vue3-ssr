import fs from 'node:fs'
import Koa from 'koa'
import KoaConnect from 'koa-connect'

import { createServer } from 'vite'

;(async () => {
    const app = new Koa()
    // 创建 vite 服务
    const viteServer = await createServer({
        root: process.cwd(),
        logLevel: 'error',
        server: {
            middlewareMode: true,
        },
        appType: 'custom'
    })

    app.use(KoaConnect(viteServer.middlewares));
    // 获取 index.html
    app.use(async (ctx) => {
        try {
            // 1. 获取index.html
            let template = fs.readFileSync('index.html', 'utf-8');
            // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
            template = await viteServer.transformIndexHtml(ctx.path, template)
            // 3. 加载服务器入口, vite.ssrLoadModule 将自动转换
            const { render } = await viteServer.ssrLoadModule('/src/entry-server.js')
            //  4. 渲染应用的 HTML
            const { renderedHtml } = await render(ctx, {})
            const html = template.replace('<!--app-html-->', renderedHtml)
            ctx.body = html
        } catch (e) {
            viteServer && viteServer.ssrFixStacktrace(e)
            console.log('e: ', e.stack)
            ctx.throw(500, e.stack)
        }
    })
    const port = 3001
    app.listen(port, () => {
        console.log(`server is listening in ${port}`)
    });
})();
