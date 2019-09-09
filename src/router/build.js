/**
 * @Description:
 * @Author: bubao
 * @Date: 2019-09-09 16:21:50
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-09 16:49:41
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
	console.log(files)
	// Setup helper functions.
	const clean = () => {
		Exec('rm -rf ' + randomPatch)
	}
	const sendError = err => {
		console.log('error')
		res.json({ error: err })
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
		await new Promise((resolve, reject) => {
			Exec(`cd ${randomPatch} && make default`, (err, stdout, stderr) => {
				if (err) {
					console.error(stderr)
					return reject(stderr)
				}
				console.log(stdout)
				resolve()
			})
		})

		// Read the hex file.

		// Send the hex file.
		// if (package) {
		//   res.responseType = 'blob'
		//   res.sendFile(TMP + key + `/keyboard/template/_build/${zipname}`, function (err) {
		//     if (err) {
		//       console.log(err);
		//     } else {
		//       console.log('Sent:', zipname);
		//     }
		//   });
		// }else{

		const hex = await new Promise((resolve, reject) => {
			Fs.readFile(
				`${randomPatch}/_build/nrf52_kbd.hex`,
				'utf8',
				(err, data) => {
					if (err) {
						console.error(err)
						return reject('Failed to read hex file.')
					}
					resolve(data)
				}
			)
		})
		res.json({ hex })
		// }

		// Clean up.
		clean()
	} catch (e) {
		console.error(e)
		clean()
		sendError(e)
	}
})

module.exports = router
