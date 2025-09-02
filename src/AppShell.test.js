import { test, describe } from 'node:test'
import { ok, strictEqual } from 'node:assert'
import AppShell from './AppShell.js'
import AppCore from './AppCore.js'
import { ExecutableCommand } from '@nan0web/protocol'
import DB from '@nan0web/db'

describe('AppShell', () => {
	test('constructor initializes app and interface', () => {
		const db = new DB()
		const app = new AppCore({ db })
		const interfaceInstance = {}

		const shell = new AppShell(app, interfaceInstance)

		strictEqual(shell.app, app)
		strictEqual(shell.interface, interfaceInstance)
	})

	test('run() registers commands and starts interface loop', async () => {
		const db = new DB()
		const app = new AppCore({ db })

		// Create mock commands
		app.actions = {
			cmd1: new ExecutableCommand({ name: 'cmd1', execute: async () => { } }),
			cmd2: new ExecutableCommand({ name: 'cmd2', execute: async () => { } })
		}

		let registeredProtocols = []
		let loopCalled = false

		const mockInterface = {
			register: (protocol) => {
				registeredProtocols.push(protocol)
			},
			loop: async () => {
				loopCalled = true
			}
		}

		const shell = new AppShell(app, mockInterface)
		await shell.run()

		ok(loopCalled)
		strictEqual(registeredProtocols.length, 2)
	})
})
