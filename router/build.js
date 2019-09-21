/**
 * @Description: build
 * @Author: bubao
 * @Date: 2019-09-09 16:21:50
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-19 11:09:37
 */
const Express = require("express");
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
		await premake(res, files, randomPatch, template, "default");
		res.sendFile(`${randomPatch}/_build/${template.hex}`, () => {
			utils.clean(randomPatch);
		});
	} catch (e) {
		console.error(e);
		utils.sendError(res, e, randomPatch, 500);
	}
});

module.exports = router;
