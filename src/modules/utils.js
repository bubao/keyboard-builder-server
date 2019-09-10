/**
 * @Description:
 * @Author: bubao
 * @Date: 2019-09-09 16:02:22
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-09 22:29:17
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
	if (where.indexOf("/var/tmp/") === 0) {
		return exec(`rm -rf ${where}`);
	}
}

function sendError(res, err, status) {
	res.status(status || 500).json({ error: err });
	clean();
}

module.exports = {
	key,
	clean,
	sendError
};
