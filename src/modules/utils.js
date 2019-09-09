/**
 * @Description:
 * @Author: bubao
 * @Date: 2019-09-09 16:02:22
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-09 17:04:19
 */

const crypto = require('crypto')
const { exec } = require('./promisify')

/**
 * 随机字符
 * @author bubao
 * @date 2019-09-09
 * @returns
 */
function key() {
	return crypto.randomBytes(16).toString('hex')
}

async function clean(where) {
	if (where.indexOf('/var/tmp/') !== 0) {
		return
	}
	await exec(`rm -rf ${where}`)
}

function sendError(res, err, status) {}

module.exports = {
	key,
	clean
}
