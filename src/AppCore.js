import DB from "@nan0web/db"
import { createT } from "@nan0web/i18n"
import AppResult from "./AppResult.js"

/** @typedef {{id: string, icon?: string, locale?: string}} Language */

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
	#initialized = false
	/** @type {DB} */
	db
	/** @type {string} */
	title = ""
	/** @type {string} */
	uri = ""
	/** @type {string} */
	locale = "uk"
	/** @type {object} */
	data = {}
	/** @type {Record<string, Function>} */
	actions = {}
	/** @type {object} */
	meta = {}
	/** @type {Record<string, Language>} */
	langs = {
		en: {
			id: "en",
			icon: "🇬🇧",
			locale: "en-GB"
		}
	}
	/** @type {(key: string, replacements: Record<string, string>) => string} */
	t = (key, replacements) => key
	/**
	 * Create an AppCore instance
	 * @param {object} config - Application configuration
	 * @param {DB} config.db - Database instance
	 * @param {string} [config.locale='uk'] - Locale identifier 2 or 5 chars: "uk" | "uk-UA"
	 */
	constructor(input = {}) {
		const {
			db,
			title = this.title,
			uri = this.uri,
			locale = this.locale,
			data = this.data,
			actions = this.actions,
			meta = this.meta,
			langs = this.langs,
			t = this.t,
		} = input
		if (!(db instanceof DB)) {
			throw new Error("Database must be an instance of @nan0web/db.DB")
		}
		this.db = db
		this.title = String(title)
		this.uri = String(uri)
		this.locale = String(locale)
		this.data = data
		this.actions = actions
		this.meta = meta
		this.langs = langs
		this.t = t
	}

	/**
	 * Bootstrap internationalization by loading translations from database
	 * @param {string} path - Path to i18n file with locale placeholder
	 * @returns {Promise<void>}
	 */
	async bootstrapI18n(path = `/i18n/{{locale}}.json`) {
		const [code, country] = this.locale.split("-")
		let uri = path.replace('{{locale}}', this.locale)
		let i18n = await this.db.fetch(uri, { defaultValue: null })
		if (null === i18n && country) {
			uri = path.replace('{{locale}}', code)
			i18n = await this.db.fetch(uri, { defaultValue: null })
		}
		this.t = createT(i18n ?? {})
	}

	/**
	 * Initializes the application with async load.
	 * @returns {Promise<boolean>} True if initilized first time, false if already initialized
	 */
	async init() {
		if (this.#initialized) return false
		await this.bootstrapI18n()
		this.#initialized = true
		return true
	}

	/**
	 * Get current application state
	 * @returns {{ data: any, actions: Record<string, Function>, meta: any, t: Function }} Current state object
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
	 * @returns {Promise<AppResult>}
	 */
	async run() {
		await this.init()
		throw new Error('AppCore: run() must be implemented')
	}

	static from(input) {
		if (input instanceof AppCore) return input
		return new AppCore(input)
	}
}
