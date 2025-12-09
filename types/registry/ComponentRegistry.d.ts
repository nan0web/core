/**
 * Registry for UI components
 * Tracks registered component namespaces
 *
 * @example
 * const registry = new ComponentRegistry()
 * registry.register('Auth.Login', { component: () => import('./Auth/Login.jsx'), owner: '@nan0web/auth.app' })
 * registry.getComponent('Auth.Login') // Returns component loader
 */
export default class ComponentRegistry {
    /**
     * Register a component namespace
     * @param {string} name - Component path (e.g. 'Auth.Login')
     * @param {{ component: Function, owner: string }} config - Component loader and package name
     * @returns {this}
     */
    register(name: string, config: {
        component: Function;
        owner: string;
    }): this;
    /**
     * Get all registered components
     * @returns {Map<string, { component: Function, owner: string }>}
     */
    getComponents(): Map<string, {
        component: Function;
        owner: string;
    }>;
    /**
     * Get component loader by name
     * @param {string} name
     * @returns {Function | null}
     */
    getComponent(name: string): Function | null;
    /**
     * Find components by namespace prefix
     * @param {string} namespace - E.g., 'Auth' to find all Auth.* components
     * @returns {Array<string>} Component names
     */
    findComponents(namespace: string): Array<string>;
    #private;
}
