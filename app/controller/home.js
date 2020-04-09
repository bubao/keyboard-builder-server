/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-04-09 14:45:37
 * @LastEditors: bubao
 * @LastEditTime: 2020-04-09 15:42:33
 */
"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
	async build() {
		const { ctx } = this;
		await ctx.service.home.build();
	}
}

module.exports = HomeController;
