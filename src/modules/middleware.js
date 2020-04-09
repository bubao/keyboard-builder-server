/**
 * @Description: 中间件
 * @Author: bubao
 * @Date: 2019-09-09 15:57:45
 * @LastEditors: bubao
 * @LastEditTime: 2020-04-09 15:23:01
 */
"use strict";

const BodyParser = require("body-parser");

/**
 * 允许所有跨域
 * @author bubao
 * @date 2019-09-11
 * @return 跨域数组，用于解析到中间件中的参数
 */
function all() {
	return [
		"*",
		(req, res, next) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header(
				"Access-Control-Allow-Methods",
				"PUT, GET, POST, DELETE, OPTIONS"
			);
			res.header(
				"Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
			);
			res.header("Access-Control-Allow-Credentials", "true");
			next();
		}
	];
}

/**
 * BodyParser
 * @author bubao
 * @date 2019-09-11
 * @return 解析到中间件中的参数
 */
function bodyParser() {
	return [BodyParser.json(), BodyParser.urlencoded({ extended: true })];
}

module.exports = { all, bodyParser };
