const hello = async (ctx, next) => {
    ctx.body = 'Hello World';
}
module.exports = { hello };
