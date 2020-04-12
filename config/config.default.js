/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-04-09 14:47:36
 * @LastEditors: bubao
 * @LastEditTime: 2020-04-12 15:58:28
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

	config.cluster = {
		listen: {
			// path: '',
			port: 5004
		}
	};
	config.cors = {
		exposeHeaders: "WWW-Authenticate,Server-Authorization,Date",
		maxAge: 100,
		credentials: true,
		allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
		allowHeaders:
			"Content-Type,Authorization,Accept,X-Custom-Header,anonymous"
	};

	return {
		...config,
		userConfig
	};
};
