/**
 * Application shell that connects application core with interface
 *
 * @class
 * @property {AppCore} app - Application core instance
 * @property {InterfaceCore} interface - Interface instance
 */
export default class AppShell {
    /**
     * Create an AppShell instance
     * @param {AppCore} app - Application core instance
     * @param {InterfaceCore} interfaceInstance - Interface instance
     */
    constructor(app: AppCore, interfaceInstance: InterfaceCore);
    /** @type {AppCore} */
    app: AppCore;
    /** @type {InterfaceCore} */
    interface: InterfaceCore;
    /**
     * Run application shell with command protocol support
     * @returns {Promise<void>}
     */
    run(): Promise<void>;
}
import AppCore from "./AppCore.js";
import { InterfaceCore } from "@nan0web/interface";
