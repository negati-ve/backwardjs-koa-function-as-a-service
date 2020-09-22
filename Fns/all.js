const _ = require('lodash')
const bye = require('./bye')
const hello = require('./hello')
const test = require('./test')
const all = async (ctx, next) => {
    _.flow([hello.hello, bye.bye, test.test])(ctx, next)
}
module.exports = { all };
