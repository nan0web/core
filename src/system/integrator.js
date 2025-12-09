import ApiRegistry from '../registry/ApiRegistry.js'
import CliRegistry from '../registry/CommandRegistry.js'
import UiRegistry from '../registry/UiRegistry.js'
import SystemValidator from './Validator.js'

/**
 * Integrates applications based on configuration file.
 * The config is loaded lazily to avoid TS JSON‑module issues.
 */
export class AppIntegrator {
	constructor() {
		this.apiRegistry = new ApiRegistry()
		this.cliRegistry = new CliRegistry()
		this.uiRegistry = new UiRegistry()
		this.validator = new SystemValidator({
			apiRegistry: this.apiRegistry,
			cliRegistry: this.cliRegistry,
			uiRegistry: this.uiRegistry,
		})
	}

	/**
	 * Load the apps configuration (JSON) at runtime.
	 * @returns {Promise<Record<string, any>>}
	 */
	async _loadConfig() {
		const { default: cfg } = await import('../config/apps.json')
		return cfg
	}

	/**
	 * Register all configured applications.
	 */
	async registerAll() {
		const config = await this._loadConfig()

		for (const [packageName, appConfig] of Object.entries(config.apps)) {
			if (!appConfig.enabled) continue

			const { default: app } = await import(`${packageName}/src/register.js`)
			const validationErrors = this.validator.validate(app, appConfig)

			if (validationErrors.length > 0) {
				console.error(`❌ ${packageName} conflicts:`, validationErrors)
				continue
			}

			this._registerApp(packageName, app, appConfig)
		}
	}

	/**
	 * Internal registration logic.
	 * @param {string} packageName
	 * @param {object} app
	 * @param {object} cfg
	 */
	_registerApp(packageName, app, cfg) {
		const registration = app.register(cfg)

		if (registration.api) {
			this.apiRegistry.register(registration.api.prefix, {
				setup: registration.api.setup,
				owner: packageName,
			})
		}

		if (registration.cli) {
			this.cliRegistry.register(registration.cli.command, {
				setup: registration.cli.setup,
				owner: packageName,
			})
		}

		if (registration.ui) {
			// ComponentRegistry expects a `register` method; we store the loader function.
			this.uiRegistry.register(registration.ui.namespace, {
				component: registration.ui.loader,
				owner: packageName,
			})
		}
	}
}
