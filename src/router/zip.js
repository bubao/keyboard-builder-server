/**
 * @Description:
 * @Author: bubao
 * @Date: 2019-09-09 16:50:09
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-09 17:04:56
 */
const Express = require('express')
const Exec = require('child_process').exec
const Fs = require('fs')
// const middleware = require('../modules/middleware')
// const promisify = require('../modules/promisify')
const { TMP } = require('../modules/const')
const utils = require('../modules/utils')

const router = Express.Router()

router.post('/', async (req, res) => {
	// Get the files.
	const files = req.body
	// Create a random key.
	const key = utils.key()
	const randomPatch = TMP + key
	console.log(randomPatch)
	console.log(files)

	// Setup helper functions.
	const clean = () => {
		Exec('rm -rf ' + randomPatch)
	}
	const sendError = (res, err, status) => {
		res.status(status || 500).json({ error: err })
		clean()
	}

	// Start.
	try {
		// Copy the base stencil.
		await new Promise((resolve, reject) => {
			Exec(
				'cp -rp /usr/local/src/nrf52-keyboard/keyboard/template ' +
					randomPatch,
				(err, stdout, stderr) => {
					if (err) {
						console.log(err)
						return reject('Failed to initialize.')
					}
					resolve()
				}
			)
		})

		// Copy all the files.
		for (const file in files) {
			await new Promise((resolve, reject) => {
				const fileName = file.replace('tmk_firmware', randomPatch)
				Fs.writeFile(fileName, files[file], err => {
					if (err) {
						console.log(err)
						return reject('Failed to initialize.')
					}
					resolve()
				})
			})
		}

		// Make.
		let zipname = ''
		await new Promise((resolve, reject) => {
			Exec(`cd ${randomPatch} && make package`, (err, stdout, stderr) => {
				if (err) {
					console.error(stderr)
					return reject(stderr)
				}
				console.log(stdout)
				Fs.readdir(randomPatch + '/_build', (error, res) => {
					if (error) {
						console.error(error)
						return reject(error)
					}
					res.forEach(element => {
						if (element.indexOf('.zip')) {
							zipname = element
							console.log(zipname)
							return resolve()
						}
					})
				})
			})
		})

		const hex = await new Promise((resolve, reject) => {
			Fs.readFile(`${randomPatch}/_build/${zipname}`, (err, data) => {
				if (err) {
					console.error(err)
					return reject(`Failed to read ${'zip'} file.`)
				}
				resolve(data)
			})
		})
		res.json({ hex })
		// Clean up.
		clean()
	} catch (e) {
		console.error(e)
		sendError(res, e, 500)
	}
})

module.exports = router
