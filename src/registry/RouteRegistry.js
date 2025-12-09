/**
 * Registry for API route namespaces
 * Tracks registered prefixes and their owners
 *
 * @example
 * const registry = new RouteRegistry()
 * registry.register('auth', { setup: (router) => { ... }, owner: '@nan0web/auth.app' })
 * registry.has('auth') // true
 */
export default class RouteRegistry {
	/** @type {Map<string, { setup: Function, owner: string }>} */
	#routes = new Map()

	/**
	 * Register a namespace prefix
	 * @param {string} prefix - URL prefix (e.g. 'auth')
	 * @param {{ setup: Function, owner: string }} config - Setup function and package name
	 * @returns {this}
	 */
	register(prefix, config) {
		this.#routes.set(prefix, config)
		return this
	}

	/**
	 * Get all registered routes
	 * @returns {Map<string, { setup: Function, owner: string }>}
	 */
	getRoutes() {
		return new Map(this.#routes)
	}

	/**
	 * Check if prefix exists
	 * @param {string} prefix
	 * @returns {boolean}
	 */
	has(prefix) {
		return this.#routes.has(prefix)
	}

	/**
	 * Get owner of prefix
	 * @param {string} prefix
	 * @returns {string | null}
	 */
	getOwner(prefix) {
		return this.#routes.get(prefix)?.owner || null
	}
}
