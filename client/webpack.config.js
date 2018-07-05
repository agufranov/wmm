const HtmlWebpackPlugin = require('html-webpack-plugin')
const proxy = require('http-proxy-middleware');
const convert = require('koa-connect');
const Router = require('koa-router');

const router = new Router();

const proxyOptions = {
    target: 'http://localhost:3000',
    changeOrigin: true
};

router.get('*', convert(proxy(proxyOptions)));
module.exports = {
    entry: './src/app.tsx',
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    serve: {
        content: [__dirname],
        add: (app, middleware, options) => {
            middleware.webpack()
            middleware.content()
            app.use(router.routes())
        }
    }
}