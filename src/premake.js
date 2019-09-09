/**
 * @Description:
 * @Author: bubao
 * @Date: 2019-09-09 23:16:30
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-09 23:22:16
 */
const { writeFile, exec } = require('./modules/promisify')
const { CORE } = require('./modules/const')
const utils = require('./modules/utils')

async function premake(res, files, randomPatch, template, make) {
	// Copy the base stencil.
	await exec(`cp -rp ${template.path} ${randomPatch}`).catch(reason => {
		console.log(reason)
		utils.sendError(res, 'Failed to initialize.', 400)
	})

	// Copy all the files.
	for (const file in files) {
		const fileName = file.replace(template.name, randomPatch)
		writeFile(fileName, files[file]).catch(reason => {
			console.log(reason)
			utils.sendError(res, 'Failed to initialize.', 400)
		})
	}
	// Make.
	await exec(`cd ${randomPatch} && ${CORE.make[make]}`).catch(reason => {
		console.error(reason)
		return 'Failed to make'
	})
}

module.exports = premake
