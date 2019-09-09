/**
 * @Description: build服务
 * @Author: bubao
 * @Date: 2019-08-29 17:13:48
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-09 23:31:28
 */

const Express = require('express')
const middleware = require('./modules/middleware')
const { PORT } = require('./modules/const')

// Create the express app.
const app = Express()
const zip = require('../router/zip')
const build = require('../router/build')

// Allow cross-origin requests.
app.all(...middleware.all())
app.use(...middleware.bodyParser())

app.use('/zip', zip)
app.use('/build', build)

// Start listening.
app.listen(PORT, () => console.log('Listening on port:' + PORT + '...'))
