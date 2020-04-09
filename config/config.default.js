/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-04-09 14:47:36
 * @LastEditors: bubao
 * @LastEditTime: 2020-04-09 17:49:54
 */
/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = {};

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + "_1586414644157_1179";

	// add your middleware config here
	config.middleware = ["errorHandler"];

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};

	return {
		...config,
		userConfig
	};
};
