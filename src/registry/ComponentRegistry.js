/**
 * Registry for UI components
 * Tracks registered component namespaces
 *
 * @example
 * const registry = new ComponentRegistry()
 * registry.register('Auth.Login', { component: () => import('./Auth/Login.jsx'), owner: '@nan0web/auth.app' })
 * registry.getComponent('Auth.Login') // Returns component loader
 */
export default class ComponentRegistry {
	/** @type {Map<string, { component: Function, owner: string }>} */
	#components = new Map()

	/**
	 * Register a component namespace
	 * @param {string} name - Component path (e.g. 'Auth.Login')
	 * @param {{ component: Function, owner: string }} config - Component loader and package name
	 * @returns {this}
	 */
	register(name, config) {
		this.#components.set(name, config)
		return this
	}

	/**
	 * Get all registered components
	 * @returns {Map<string, { component: Function, owner: string }>}
	 */
	getComponents() {
		return new Map(this.#components)
	}

	/**
	 * Get component loader by name
	 * @param {string} name
	 * @returns {Function | null}
	 */
	getComponent(name) {
		return this.#components.get(name)?.component || null
	}

	/**
	 * Find components by namespace prefix
	 * @param {string} namespace - E.g., 'Auth' to find all Auth.* components
	 * @returns {Array<string>} Component names
	 */
	findComponents(namespace) {
		return Array.from(this.#components.keys())
			.filter(name => name.startsWith(namespace))
	}
}
