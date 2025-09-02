import DB from "@nan0web/db"
import { createT } from "@nan0web/i18n"
import { ExecutableCommand } from "@nan0web/protocol"

/**
 * Core application class that handles database operations and internationalization.
 *
 * @class
 * @property {DB} db - Database instance for data operations
 * @property {string} locale - Current locale identifier (e.g. 'uk', 'en')
 * @property {object} data - Application data storage
 * @property {Record<string, Function>} actions - Application actions registry
 * @property {object} meta - Application metadata
 * @property {Function} t - Translation function
 */
export default class AppCore {
	/**
	 * Create an AppCore instance
	 * @param {object} config - Application configuration
	 * @param {DB} config.db - Database instance
	 * @param {string} [config.locale='uk'] - Locale identifier
	 */
	constructor({ db, locale = 'uk' }) {
		/** @type {DB} */
		this.db = db
		/** @type {string} */
		this.locale = locale
		/** @type {object} */
		this.data = {}
		/** @type {Record<string, ExecutableCommand>} */
		this.actions = {}
		/** @type {object} */
		this.meta = {}
		/** @type {Function} */
		this.t = (key) => key
	}

	/**
	 * Bootstrap internationalization by loading translations from database
	 * @param {string} path - Path to i18n file with locale placeholder
	 * @returns {Promise<void>}
	 */
	async bootstrapI18n(path = `/i18n/{{locale}}.json`) {
		const i18nPath = path.replace('{{locale}}', this.locale)
		const i18n = await this.db.fetch(i18nPath)
		this.t = createT(i18n)
	}

	/**
	 * Get current application state
	 * @returns {{ data: any, actions: Record<string, ExecutableCommand>, meta: any, t: Function }} Current state object
	 */
	state() {
		return {
			data: this.data,
			actions: this.actions,
			meta: this.meta,
			t: this.t
		}
	}

	/**
	 * Main application execution method
	 * @abstract Must be implemented in subclass
	 * @returns {Promise<void>}
	 */
	async run() {
		throw new Error('AppCore: run() must be implemented')
	}
}
