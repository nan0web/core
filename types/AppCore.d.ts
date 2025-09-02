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
    constructor({ db, locale }: {
        db: DB;
        locale?: string | undefined;
    });
    /** @type {DB} */
    db: DB;
    /** @type {string} */
    locale: string;
    /** @type {object} */
    data: object;
    /** @type {Record<string, ExecutableCommand>} */
    actions: Record<string, ExecutableCommand>;
    /** @type {object} */
    meta: object;
    /** @type {Function} */
    t: Function;
    /**
     * Bootstrap internationalization by loading translations from database
     * @param {string} path - Path to i18n file with locale placeholder
     * @returns {Promise<void>}
     */
    bootstrapI18n(path?: string): Promise<void>;
    /**
     * Get current application state
     * @returns {{ data: any, actions: Record<string, ExecutableCommand>, meta: any, t: Function }} Current state object
     */
    state(): {
        data: any;
        actions: Record<string, ExecutableCommand>;
        meta: any;
        t: Function;
    };
    /**
     * Main application execution method
     * @abstract Must be implemented in subclass
     * @returns {Promise<void>}
     */
    run(): Promise<void>;
}
import DB from "@nan0web/db";
import { ExecutableCommand } from "@nan0web/protocol";
