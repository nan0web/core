/**
 * Registry for CLI command namespaces
 * Tracks registered commands and their owners
 *
 * @example
 * const registry = new CommandRegistry()
 * registry.register('auth', { setup: () => { ... }, owner: '@nan0web/auth.app' })
 * registry.has('auth') // true
 */
export default class CommandRegistry {
	/** @type {Map<string, { setup: Function, owner: string }>} */
	#commands = new Map()

	/**
	 * Register a CLI command namespace
	 * @param {string} command - Command name (e.g. 'auth')
	 * @param {{ setup: Function, owner: string }} config - Setup function and package name
	 * @returns {this}
	 */
	register(command, config) {
		this.#commands.set(command, config)
		return this
	}

	/**
	 * Get all registered commands
	 * @returns {Map<string, { setup: Function, owner: string }>}
	 */
	getCommands() {
		return new Map(this.#commands)
	}

	/**
	 * Check if command exists
	 * @param {string} command
	 * @returns {boolean}
	 */
	has(command) {
		return this.#commands.has(command)
	}

	/**
	 * Get owner of command
	 * @param {string} command
	 * @returns {string | null}
	 */
	getOwner(command) {
		return this.#commands.get(command)?.owner || null
	}
}
