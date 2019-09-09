/**
 * @Description:
 * @Author: bubao
 * @Date: 2019-09-09 16:21:50
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-09 23:23:39
 */
const Express = require('express')
// const middleware = require('../modules/middleware')
const { readFile } = require('../src/modules/promisify')
const { TMP, CORE } = require('../src/modules/const')
const utils = require('../src/modules/utils')
const premake = require('../src/premake')

const router = Express.Router()

router.post('/', async (req, res) => {
	// Get the files.
	const files = req.body.files
	const template = CORE.layout[req.body.name]
	// Create a random key.
	const key = utils.key()
	const randomPatch = TMP + key

	// Start.
	try {
		await premake(res, files, randomPatch, template, 'default')

		const hex = await readFile(
			`${randomPatch}/_build/${template.hex}`
		).catch(reason => {
			console.error(reason)
			utils.sendError(res, 'Failed to read zip file.', 400)
		})
		res.json({ hex })
		// Clean up.
		utils.clean()
	} catch (e) {
		console.error(e)
		utils.sendError(res, e, 500)
	}
})

module.exports = router
