/**
 * @Description:
 * @Author: bubao
 * @Date: 2019-09-09 16:02:22
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-19 11:10:13
 */

const crypto = require("crypto");
const { exec } = require("./promisify");

/**
 * 随机字符
 * @author bubao
 * @date 2019-09-09
 * @returns
 */
function key() {
	return crypto.randomBytes(16).toString("hex");
}

/**
 * 清除tmp
 * @author bubao
 * @date 2019-09-11
 * @param {string} where /var/tmp/*
 * @returns
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
 * @param {*} err
 * @param {*} randomPatch
 * @param {*} status
 */
function sendError(res, err, randomPatch, status) {
	res.status(status || 500).json({ error: err });
	clean(randomPatch);
}

module.exports = {
	key,
	clean,
	sendError
};
