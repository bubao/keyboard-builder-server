/**
 * @Description:
 * @Author: bubao
 * @Date: 2019-09-09 16:02:22
 * @LastEditors: bubao
 * @LastEditTime: 2020-04-09 15:27:37
 */
"use strict";

const crypto = require("crypto");
const { exec } = require("./promisify");

/**
 * 随机字符
 * @author bubao
 * @date 2019-09-09
 * @return {String} 随机字符
 */
function key() {
	return crypto.randomBytes(16).toString("hex");
}

/**
 * 清除tmp
 * @author bubao
 * @date 2019-09-11
 * @param {string} where /var/tmp/*
 * @return PromiseWithChild
 */
function clean(where) {
	if (where !== undefined && where.indexOf("/var/tmp/") === 0) {
		return exec(`rm -rf ${where}`);
	}
}

/**
 * 返回错误信息，并清除tmp
 * @author bubao
 * @date 2019-09-11
 * @param {*} res
 * @param {*} error
 * @param {*} randomPatch
 * @param {*} status
 */
function sendError(res, error, randomPatch, status) {
	res.status(status || 500).json({ error });
	return clean(randomPatch);
}

module.exports = {
	key,
	clean,
	sendError
};
