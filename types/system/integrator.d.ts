/**
 * Integrates applications based on configuration file.
 * The config is loaded lazily to avoid TS JSON‑module issues.
 */
export class AppIntegrator {
    apiRegistry: ApiRegistry;
    cliRegistry: CliRegistry;
    uiRegistry: UiRegistry;
    validator: SystemValidator;
    /**
     * Load the apps configuration (JSON) at runtime.
     * @returns {Promise<Record<string, any>>}
     */
    _loadConfig(): Promise<Record<string, any>>;
    /**
     * Register all configured applications.
     */
    registerAll(): Promise<void>;
    /**
     * Internal registration logic.
     * @param {string} packageName
     * @param {object} app
     * @param {object} cfg
     */
    _registerApp(packageName: string, app: object, cfg: object): void;
}
import ApiRegistry from '../registry/ApiRegistry.js';
import CliRegistry from '../registry/CommandRegistry.js';
import UiRegistry from '../registry/UiRegistry.js';
import SystemValidator from './Validator.js';
