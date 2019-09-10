/**
 * @Description: make package
 * @Author: bubao
 * @Date: 2019-09-09 16:50:09
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-10 18:42:10
 */
const Express = require("express");
// const middleware = require('../modules/middleware')
const { readdir } = require("../src/modules/promisify");
const { TMP, CORE } = require("../src/modules/const");
const utils = require("../src/modules/utils");
const premake = require("../src/premake");

const router = Express.Router();

router.post("/", async (req, res) => {
	// Get the files.
	const files = req.body;
	const template = CORE.layout;
	// Create a random key.
	const key = utils.key();
	const randomPatch = TMP + key;
	// Start.
	try {
		await premake(res, files, randomPatch, template, "package");

		let zipname = "";
		await readdir(randomPatch + "/_build")
			.then(values => {
				values.forEach(element => {
					if (element.indexOf(".zip") !== -1) {
						console.log("in ", element);
						zipname = element;
					}
				});
			})
			.catch(reason => {
				console.error(reason);
				utils.sendError(
					res,
					"Failed to read zip file.",
					randomPatch,
					400
				);
			});
		res.sendFile(`${randomPatch}/_build/${zipname}`);
		// Clean up.
		utils.clean(randomPatch);
	} catch (e) {
		console.error(e);
		utils.sendError(res, e, randomPatch, 500);
	}
});

module.exports = router;
