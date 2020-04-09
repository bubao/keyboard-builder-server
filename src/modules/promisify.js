/**
 * @Description: promisify
 * @Author: bubao
 * @Date: 2019-09-09 16:15:30
 * @LastEditors: bubao

 * @LastEditTime: 2019-09-09 22:27:45
 */
"use strict";
const util = require("util");

const exec = util.promisify(require("child_process").exec);

const fs = require("fs");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

module.exports = {
	exec,
	writeFile,
	readFile,
	readdir
};
