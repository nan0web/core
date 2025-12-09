import RouteRegistry from '../registry/RouteRegistry.js'
import CommandRegistry from '../registry/CommandRegistry.js'
import ComponentRegistry from '../registry/ComponentRegistry.js'

/**
 * Validates application integration before registration
 * Checks for namespace collisions across all registries
 */
export default class SystemValidator {
	/**
	 * @param {Object} registries - System-wide registries
	 * @param {RouteRegistry} registries.apiRegistry - Manages API route prefixes
	 * @param {CommandRegistry} registries.cliRegistry - Manages CLI commands
	 * @param {ComponentRegistry} [registries.uiRegistry] - Manages UI components
	 */
	constructor({ apiRegistry, cliRegistry, uiRegistry }) {
		if (!(apiRegistry instanceof RouteRegistry)) {
			throw new Error('apiRegistry must be an instance of RouteRegistry')
		}

		if (!(cliRegistry instanceof CommandRegistry)) {
			throw new Error('cliRegistry must be an instance of CommandRegistry')
		}

		this.apiRegistry = apiRegistry
		this.cliRegistry = cliRegistry
		this.uiRegistry = uiRegistry || new ComponentRegistry()
	}

	/**
	 * Validate application configuration for potential conflicts
	 * @param {Object} application - Must have register() method
	 * @param {Object} [configuration] - Custom integration settings
	 * @returns {Array<string>} List of collision errors
	 */
	validate(application, configuration = {}) {
		const { api, cli, react } = application.register(configuration)
		const errors = []

		if (this.apiRegistry.has(api.prefix)) {
			errors.push(`API prefix "${api.prefix}" used by ${this.apiRegistry.getOwner(api.prefix)}`)
		}

		if (this.cliRegistry.has(cli.command)) {
			errors.push(`CLI command "${cli.command}" used by ${this.cliRegistry.getOwner(cli.command)}`)
		}

		// Check UI namespace collision (simplified)
		if (react.namespace && this.uiRegistry.findComponents(react.namespace).length > 0) {
			errors.push(`UI namespace "${react.namespace}.*" already has registered components`)
		}

		return errors
	}
}
