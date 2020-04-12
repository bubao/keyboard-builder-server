/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-04-09 14:45:37
 * @LastEditors: bubao
 * @LastEditTime: 2020-04-12 15:36:44
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

	async ch554() {
		const { ctx } = this;
		await ctx.service.home.ch554();
	}
}

module.exports = HomeController;
