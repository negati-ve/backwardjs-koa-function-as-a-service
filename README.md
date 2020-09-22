# Koa boilerplate for quick prototyping

## Getting started
1. `git clone https://github.com/negati-ve/backwardjs-koa-function-as-a-service.git`
2. `npm install`
3. `nodemon index.js`

## Create your first route
create a new function/file inside /Fns/
functions follow the standard koa idiom 

eg: /Fns/hello.js
```
const hello = async (ctx, next) => {
    ctx.body = 'Hello World';
}
module.exports = { hello };
```
exported function name must match file name.

that's it. 

Visit http://localhost:3433/hello 

## Dynamic routes
dynamic routes borrow from NextJS.

/Fns/api/page/[id].js
matches any id
eg: http://localhost:3433/api/page/12 

## Custom http method mapping
you can define multiple routes for every function while exporting your function as seen in /Fns/api/todo/[id].js
module.exports = {
    '/api/todo/[id]': {
        method: 'GET',
        fn: get
    },
    '/api/todo/[id]_POST': {
        method: 'POST',
        route: '/api/todo/[id]',
        fn: post
    },
    '/api/todo/[id]_DEL': {
        method: 'DELETE',
        route: '/api/todo/[id]',
        fn: del
    }
};

