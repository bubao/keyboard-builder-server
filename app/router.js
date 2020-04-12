/**
 * @Description:
 * @Author: bubao
 * @Date: 2020-04-09 14:45:37
 * @LastEditors: bubao
 * @LastEditTime: 2020-04-12 14:08:25
 */
"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;
	router.post("/download/build", controller.home.build);
	router.post("/download/zip", controller.home.zip);
	router.post("/download/ch554", controller.home.ch554);
};
