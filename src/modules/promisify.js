/**
 * @Description: promisify
 * @Author: bubao
 * @Date: 2019-09-09 16:15:30
 * @LastEditors: bubao

 * @LastEditTime: 2019-09-09 16:16:58
 */
const util = require('util')

const exec = util.promisify(require('child_process').exec)

const fs = require('fs')
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

module.exports = {
	exec,
	writeFile,
	readFile
}
