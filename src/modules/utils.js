/**
 * @Description:
 * @Author: bubao
 * @Date: 2019-09-09 16:02:22
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-10 18:10:40
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

function clean(where) {
	if (where && where.indexOf("/var/tmp/") === 0) {
		return exec(`rm -rf ${where}`);
	}
}

function sendError(res, err, randomPatch, status) {
	res.status(status || 500).json({ error: err });
	clean(randomPatch);
}

module.exports = {
	key,
	clean,
	sendError
};
