import { resolveDefaults, resolveAliases, resolveValidation } from '@nan0web/types'

/**
 * Domain Data Model for a Project Configuration
 * Implements Model-as-Schema (Project-as-Data)
 *
 * Ця модель є дзеркалом `project.schema.yaml` та джерелом правди
 * для автоматичних інструментів валідації та генерації ТЗ.
 *
 * @example
 * import { Model } from '@nan0web/core'
 * const model = new Model({ description: 'My App', tags: ['ui'] })
 */
export class Model {
	#options = {}
	/**
	 * @param {Partial<Model>} data Data from YAML or Markdown frontmatter
	 * @param {object} [options] Extended options (db, etc.)
	 */
	constructor(data = {}, options = {}) {
		const Model = this.constructor
		Object.assign(this, resolveDefaults(Model, resolveAliases(Model, data)))
		this.#options = options
	}

	/** @returns {import('@nan0web/db').default | undefined} */
	get db() {
		return this.#options.db
	}

	/** 
	 * Environment options dependencies
	 * @returns {object}
	 */
	get _() {
		return this.#options
	}

	/**
	 * Validate instance against static schema metadata.
	 * @returns {boolean} True if validation passes
	 * @throws {import('@nan0web/types').ModelError}
	 */
	validate() {
		return resolveValidation(this.constructor, this)
	}
}
