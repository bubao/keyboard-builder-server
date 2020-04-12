/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-04-09 15:43:29
 * @LastEditors: bubao
 * @LastEditTime: 2020-04-12 14:17:31
 */
"use strict";
const crypto = require("crypto");
const util = require("util");
const fs = require("fs");

const exec = util.promisify(require("child_process").exec);
const writeFile = util.promisify(fs.writeFile);
const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

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
	if (where !== undefined && where.indexOf("/home/geno/SOURCE/tmp") === 0) {
		return exec(`rm -rf ${where}`);
	}
}

/**
 * 返回错误信息，并清除tmp
 * @author bubao
 * @date 2019-09-11
 * @param {*} error
 * @param {*} randomPatch
 * @param {*} status
 */
function sendError(error, randomPatch, status) {
	const { ctx } = this;
	ctx.status = status || 500;
	ctx.body = { error };
	return clean(randomPatch);
}

module.exports = {
	TMP: "/home/geno/SOURCE/tmp/",
	CORE: {
		layout: {
			name: "lotkb",
			kbdhex: "nrf52_kbd.hex",
			ch554hex: "ch554.hex",
			path: "/home/geno/SOURCE/nRF52-Keyboard/keyboard/builder"
		},
		action: {
			package: "make package",
			default: "make default",
			ch554: "make ch544"
		}
	},
	stat,
	exec,
	sendError,
	clean,
	key,
	writeFile,
	readFile,
	readdir
};
