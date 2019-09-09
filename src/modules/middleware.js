/**
 * @Description:
 * @Author: bubao
 * @Date: 2019-09-09 15:57:45
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-09 16:12:47
 */

const BodyParser = require('body-parser')

function all() {
	return [
		'*',
		(req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*')
			res.header(
				'Access-Control-Allow-Methods',
				'PUT, GET, POST, DELETE, OPTIONS'
			)
			res.header(
				'Access-Control-Allow-Headers',
				'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
			)
			res.header('Access-Control-Allow-Credentials', 'true')
			next()
		}
	]
}

function bodyParser() {
	return [BodyParser.json(), BodyParser.urlencoded({ extended: true })]
}

module.exports = { all, bodyParser }
