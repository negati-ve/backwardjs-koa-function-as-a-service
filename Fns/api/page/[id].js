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
    '/api/page/[id]': get
};
