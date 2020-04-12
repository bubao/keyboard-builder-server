/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-04-09 14:45:37
 * @LastEditors: bubao
 * @LastEditTime: 2020-04-12 13:39:56
 */
"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
	async build() {
		const { ctx } = this;
		await ctx.service.home.build();
	}

	async zip() {
		const { ctx } = this;
		await ctx.service.home.zip();
	}
}

module.exports = HomeController;
