/**
 * @Description: make 前
 * @Author: bubao
 * @Date: 2019-09-09 23:16:30
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-19 11:08:06
 */
const { writeFile, exec } = require("./modules/promisify");
const { CORE } = require("./modules/const");
const utils = require("./modules/utils");

async function premake(res, files, randomPatch, template, make) {
	console.log("premake");
	// Copy the base stencil.
	await exec(`cp -rp ${template.path} ${randomPatch}`).catch(reason => {
		console.log(reason);
		utils.sendError(res, "Failed to initialize.", randomPatch, 400);
	});
	console.log("premake:" + `cp -rp ${template.path} ${randomPatch}`);
	// Copy all the files.
	for (const file in files) {
		const fileName = file.replace("tmk_firmware", randomPatch);
		await writeFile(fileName, files[file]).catch(reason => {
			console.log(reason);
			utils.sendError(res, "Failed to initialize.", randomPatch, 400);
		});
	}
	console.log("premake:" + `cd ${randomPatch} && ${CORE.action[make]}`);
	// Make.
	await exec(`cd ${randomPatch} && ${CORE.action[make]}`).catch(reason => {
		console.error(reason);
		return "Failed to make";
	});
}

module.exports = premake;
