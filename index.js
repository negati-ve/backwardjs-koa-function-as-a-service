const Koa = require('koa');
var Router = require('koa-router');
const app = new Koa();
var router = new Router();
var normalizedPath = require("path").join(__dirname, "Fns");
var exportedFns = {}

const { resolve } = require('path');
const { matches } = require('lodash');
const { readdir } = require('fs').promises;

async function* getFns(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFns(res);
        } else {
            yield res;
        }
    }
}


(async () => {
    for await (const f of getFns('./Fns')) {
        fnFile = f.replace(__dirname + '/Fns/', '');
        exportedFns = { ...exportedFns, ...require(f) }

        Object.keys(require(f)).forEach((fn) => {
            if (typeof exportedFns[fn] == 'object') {
                let route = '', routeFn, routeMethod, routeMatches
                let re = /(?<=\[)(.*?)(?=\])/g
                routeMatches = fn.match(re)
                if (routeMatches) {
                    route = (typeof exportedFns[fn].route !== 'undefined') ? exportedFns[fn].route.replace('[', ':').replace(']', '') :
                        fn.replace('[', ':').replace(']', '');
                } else {
                    route = typeof exportedFns[fn].route !== 'undefined' ? exportedFns[fn].route : fn;
                }
                routeFn = typeof exportedFns[fn].fn !== 'undefined' ? exportedFns[fn].fn : async () => console.log(`please add a fn to ${route}`);
                routeMethod = typeof exportedFns[fn].method !== 'undefined' ? exportedFns[fn].method.toLowerCase() : 'all';
                // console.log({ route, routeFn, routeMethod })
                router[routeMethod](route, routeFn);
            } else if (fn.match(/(?<=\[)(.*?)(?=\])/g) !== null) {
                route = fn.replace('[', ':').replace(']', '');
                router.all(route, exportedFns[fn]);
            } else {
                router.all('/' + fn, exportedFns[fn]);
            }
        })
    }
})()

app
    .use(router.routes())
    .use(router.allowedMethods());
module.exports = { app }