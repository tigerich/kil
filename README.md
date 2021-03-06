# kil
kil is a tool based on nodejs and webpack, it helps improve the develop, test and release on web apps.

# Install
*  install nodejs. see more [nodejs](https://nodejs.org)
*  ~~git clone [kil](https://github.com/lovelypig5/kil.git) to your local workspace~~

```node
npm install -g kil (默认有国外代理情况下)
npm install -g kil  --phantomjs_cdnurl=http://cnpmjs.org/downloads --registry=https://registry.npm.taobao.org (推荐从淘宝源安装)
```

# Features
* [webpack](https://webpack.github.io/)
* [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html)
* [babel](https://babeljs.io/)
* [less](http://lesscss.org/)
* [mustache](https://mustache.github.io/)
* [autoprefixer](https://github.com/postcss/autoprefixer)
* [postcss-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [url-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [less-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [css-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [style-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [exports-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [ejs-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [expose-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [file-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [html-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [img-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [imports-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [json-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [css-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [mustache-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [template-html-loader](https://webpack.github.io/docs/list-of-loaders.html)
* [extract-text-webpack-plugin](https://webpack.github.io/docs/list-of-plugins.html)
* [html-webpack-plugin](https://webpack.github.io/docs/list-of-plugins.html)

# Usage
  support init, develop, test, mock data and release cmds

###init
```javascript
    kil init          // init a project with default
    kil init -h       // get init help
    kil init -m       // init mock module, this module will only work on development
    kil init -t       // init test module, this module won't be built into bundle on release
```
init the project with kil:
kil will init package.json. install npm dependencies and create js, css, img, less, test folders with default index.js and index.html asynchronized

###dev
```javascript
    kil dev
    kil dev -p 9001    // specify the port of dev server
    kil dev -m         // dev with mock module
```
after project init, kil dev helps open the [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html).
support livereload, less compile, [data mock](https://github.com/nuysoft/Mock), [hot-module-replace](https://webpack.github.io/docs/hot-module-replacement.html), es6 is default support by [babel](https://babeljs.io/).

###test
```javascript
    kil test                   // default run karma once and test with mocha framework
    kil test -M | --no-mocha   // disable mocha
    kil test -p                // enable phantomjs
    kil test -s                // run karma as a server, CI unit tests
```
test is default support by phantomjs and mocha, [mocha](https://mochajs.org/) for unit tests and [phantomjs](http://phantomjs.org/) for page automation tests.
reports will be export at reports folder at your workspace

###build
```javascript
    kil build
    kil build -s      // generate source map
    kil build -C      // build without clean
    kil build -m      // build with mock data, this option will disable sourcemap
```
minify your js, less to target js and css to dist folder.

###release
```javascript
    kil release
    kil release -s      // generate source map
    kil release -C      // release without clean
```
minify your js, less to target js and css. package to a zip file for production.

###help
show usage and help information

#Configuration
kil accept two kinds of configuration, a key kil in package.json or a separate pack.js. pack.js is prior to package.json
<h4><font color="red" size="">important:</font> if you want enable react, mock or copy files, package.json should be configured.</h4>

#Global Value
when server start with kil dev
```javascript
    var WEBPACK_DEBUG = true;
    var process.env = 'development';
```
otherwise
```javascript
    var WEBPACK_DEBUG = false;
    var process.env = 'production';
```

* package.json
* <font color="red" size="">deprecated:</font> ~~"mock": true,~~ is removed from package.jsom after version 1.0.5, please use ``` kil dev -m``` instead
* add ``` vue: false ``` for default
```javascript
    {
        "kil": {
            "port": 9000,          // port of dev server
            "react": true,         // enable react support
            "vue": false,
            "html5Mode": false,    // enable html5 history api
            "es7": false,          // support es7 async, object-rest-spread, flow-strip-types
            "copy": ["img/*"],
            "webpack": {
                "publicPath": "/", // location of files serve at your server: localhost:8080/
                "output": {
                    "page/*.html": {
                        "jsname": "page/index2",
                        "commons": ["common"]
                    },
                    "*.html": {
                        "commons": ["common"]
                    }
                },
                "commonTrunk": {
                    "common": ["jquery", "react", "react-dom"]
                },
                "global": {
                    "React": "react",
                    "ReactDOM": "react-dom",
                    "$": "jquery"
                },
                "resolve": {
                    "alias": {
                        "spm-hammer": "hammerjs"
                    }
                },
                "devServer": {
                    "proxy": {
                        "*": "http://localhost:3001"
                    }
                }
            }
        }
    }
```

* pack.js

```javascript
    /**
     * modulePath is the location of kil node_modules
     */
    module.exports = (modulePath) => {

        var path = require('path');
        // var webpack = require(`${modulePath}/webpack`);
        // var HtmlWebpackPlugin = require(`${modulePath}/html-webpack-plugin`);

        return {
            // if single entry is used, bundle name will be named as main.js
            entry: {
                main: "./index",
                // common: ['jquery']
            },
            // plugins example, default no more
            plugins: [
                // new webpack.ProvidePlugin({
                //     $: "jquery",
                //     jQuery: "jquery"
                // }),
                // new HtmlWebpackPlugin({
                //     template: './index.html',
                //     filename: './index.html',
                //     chunks: ['main', 'common']
                // }),
                // new webpack.optimize.CommonsChunkPlugin({
                //     name: "common"
                // })
            ],
            module: {
                loaders: []
            },
            externals: [],
            devServer: {
                // proxy: {
                //     '*': 'http://localhost:3000'
                // }
            }
        }
    }
```

* proxy

  see [node-proxy](https://github.com/nodejitsu/node-http-proxy#options) for more options

```javascript
  devServer: {
     proxy: {
         '*': {
            "target":"http://localhost:3000",
            "toProxy":true,
            // more see option
        }
     }
  }
```

# TODO
* test case

# Author
* [out2man](http:/www.out2man.com)

# See also
* [webpack](https://webpack.github.io/)
* [mocha](https://mochajs.org/)
* [phantomjs](http://phantomjs.org/)
* [nodejs](https://nodejs.org)
