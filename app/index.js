require('dotenv').config();
// const createServer = require('auto-sni'); // TODO: implement this ;)
const koa = require('koa');
const app = koa();
const _ = require('koa-route');
const mount = require('koa-mount');
const static = require('koa-static');
const routes = require('./routes');
const Jade = require('koa-jade');

const jade = new Jade({
    viewPath: './app/views',
    debug: false,
    pretty: false,
    compileDebug: false,
    locals: {},
    noCache: process.env.NO_CACHE === 'true',
    app: app
})

// Serve static files (images / dist js/css)
app.use(mount('/assets', static('./app/assets')));

// Routes
app.use(_.get('/', routes.index));

app.listen(process.env.APP_PORT, () => {
    console.info(`${process.env.APP_NAME} is running on ${process.env.APP_PORT}`);
});
