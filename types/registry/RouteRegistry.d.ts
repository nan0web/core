/**
 * Registry for API route namespaces
 * Tracks registered prefixes and their owners
 *
 * @example
 * const registry = new RouteRegistry()
 * registry.register('auth', { setup: (router) => { ... }, owner: '@nan0web/auth.app' })
 * registry.has('auth') // true
 */
export default class RouteRegistry {
    /**
     * Register a namespace prefix
     * @param {string} prefix - URL prefix (e.g. 'auth')
     * @param {{ setup: Function, owner: string }} config - Setup function and package name
     * @returns {this}
     */
    register(prefix: string, config: {
        setup: Function;
        owner: string;
    }): this;
    /**
     * Get all registered routes
     * @returns {Map<string, { setup: Function, owner: string }>}
     */
    getRoutes(): Map<string, {
        setup: Function;
        owner: string;
    }>;
    /**
     * Check if prefix exists
     * @param {string} prefix
     * @returns {boolean}
     */
    has(prefix: string): boolean;
    /**
     * Get owner of prefix
     * @param {string} prefix
     * @returns {string | null}
     */
    getOwner(prefix: string): string | null;
    #private;
}
