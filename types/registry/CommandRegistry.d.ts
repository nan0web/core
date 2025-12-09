/**
 * Registry for CLI command namespaces
 * Tracks registered commands and their owners
 *
 * @example
 * const registry = new CommandRegistry()
 * registry.register('auth', { setup: () => { ... }, owner: '@nan0web/auth.app' })
 * registry.has('auth') // true
 */
export default class CommandRegistry {
    /**
     * Register a CLI command namespace
     * @param {string} command - Command name (e.g. 'auth')
     * @param {{ setup: Function, owner: string }} config - Setup function and package name
     * @returns {this}
     */
    register(command: string, config: {
        setup: Function;
        owner: string;
    }): this;
    /**
     * Get all registered commands
     * @returns {Map<string, { setup: Function, owner: string }>}
     */
    getCommands(): Map<string, {
        setup: Function;
        owner: string;
    }>;
    /**
     * Check if command exists
     * @param {string} command
     * @returns {boolean}
     */
    has(command: string): boolean;
    /**
     * Get owner of command
     * @param {string} command
     * @returns {string | null}
     */
    getOwner(command: string): string | null;
    #private;
}
