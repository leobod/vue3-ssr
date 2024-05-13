import Koa from 'koa'
import sendFile from 'koa-send'
import fs from 'node:fs'

const clientRoot = 'dist/client'
const template = fs.readFileSync('./dist/client/index.html', 'utf-8')
import { render } from './dist/server/entry-server.js'
const manifest = fs.readFileSync('./dist/client/.vite/ssr-manifest.json', 'utf-8')

;(async () => {
    const app = new Koa()

    app.use(async (ctx) => {

        // 请求的是静态资源
        if (ctx.path.startsWith('/assets')) {
            await sendFile(ctx, ctx.path, { root: clientRoot })
            return
        }

        const [appHtml, preloadLinks] = await render(ctx, manifest);

        const html = template
            .replace('<!--preload-links-->', preloadLinks)
            .replace('<!--app-html-->', appHtml)

        ctx.body = html
    });

    const port = 8080
    app.listen(port, () => {
        console.log(`started server on http://localhost:${port}`)
    })
})();
