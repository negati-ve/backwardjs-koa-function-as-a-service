const get = async (ctx, next) => {
    ctx.body = ('get')
}

const post = async (ctx, next) => {
    ctx.body = (ctx.params.id)
}

const del = async (ctx, next) => {
    ctx.redirect('/')
}

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
