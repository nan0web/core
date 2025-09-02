import { CommandProtocol } from "@nan0web/protocol"
import { InterfaceCore } from "@nan0web/interface"
import AppCore from "./AppCore.js"
import Logger from "@nan0web/log"

/**
 * Application shell that connects application core with interface
 *
 * @class
 * @property {AppCore} app - Application core instance
 * @property {InterfaceCore} interface - Interface instance
 */
export default class AppShell {
	/**
	 * Create an AppShell instance
	 * @param {AppCore} app - Application core instance
	 * @param {InterfaceCore} interfaceInstance - Interface instance
	 */
	constructor(app, interfaceInstance) {
		/** @type {AppCore} */
		this.app = app
		/** @type {InterfaceCore} */
		this.interface = interfaceInstance
	}

	/**
	 * Run application shell with command protocol support
	 * @returns {Promise<void>}
	 */
	async run() {
		// Register commands as protocols
		const commands = Object.entries(this.app.actions || {})
		for (const [, command] of commands) {
			this.interface.register(new CommandProtocol({
				command,
				db: this.app.db,
				logger: new Logger(),
			}))
		}

		await this.interface.loop()
	}
}
