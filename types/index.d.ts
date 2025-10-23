export default AppCore;
export type Language = import("./AppCore.js").Language;
import AppCore from "./AppCore.js";
import AppResult from "./AppResult.js";
import { ExecutableCommand } from "@nan0web/protocol";
export { AppCore, AppResult, ExecutableCommand };
