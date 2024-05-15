const Koa = require("koa");
const { renderToString } = require("@vue/server-renderer");
const path = require("path");
const manifest = require("./dist/ssr-manifest.json");
const appPath = path.join(__dirname, "./dist", manifest["server.js"]);
const createApp = require(appPath).default;
const fs = require("fs");
const Mount = require("koa-mount");
const Static = require("koa-static");
const KoaBodyparser = require("koa-bodyparser");
const KoaRouter = require("koa-router");

const app = new Koa();
app.use(KoaBodyparser());
let router = new KoaRouter();

app.use(Mount("/", Static("./dist")));

router.get("/api/news", async (ctx) => {
  ctx.body = [
    { code: 1, title: "新闻标题1" },
    { code: 2, title: "新闻标题2" },
    { code: 3, title: "新闻标题3" },
    { code: 4, title: "新闻标题4" },
  ];
});
app.use(router.routes());

// 获取模板
const indexTemplate = fs.readFileSync(
  path.join(__dirname, "./dist/index.template.html"),
  "utf-8"
);

// 获取 index.template.html
app.use(async (ctx) => {
  try {
    const appContent = await createApp(ctx);
    const html = indexTemplate
      .toString()
      .replace('<div id="app">', `<div id="app">${appContent}`);
    ctx.body = html;
  } catch (e) {
    console.log(e);
    if (e.code == 404) {
      ctx.body = "页面去火星了，找不到了，404啦";
    } else {
      ctx.throw(500, e.stack);
    }
  }
});
const port = 3001;
app.listen(port, () => {
  console.log(`server is listening in ${port}`);
});
