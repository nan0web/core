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
    constructor({ apiRegistry, cliRegistry, uiRegistry }: {
        apiRegistry: RouteRegistry;
        cliRegistry: CommandRegistry;
        uiRegistry?: ComponentRegistry | undefined;
    });
    apiRegistry: RouteRegistry;
    cliRegistry: CommandRegistry;
    uiRegistry: ComponentRegistry;
    /**
     * Validate application configuration for potential conflicts
     * @param {Object} application - Must have register() method
     * @param {Object} [configuration] - Custom integration settings
     * @returns {Array<string>} List of collision errors
     */
    validate(application: any, configuration?: any): Array<string>;
}
import RouteRegistry from '../registry/RouteRegistry.js';
import CommandRegistry from '../registry/CommandRegistry.js';
import ComponentRegistry from '../registry/ComponentRegistry.js';
