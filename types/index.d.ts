export default AppCore;
export type Language = import("./AppCore.js").Language;
import AppCore from './AppCore.js';
import AppResult from './AppResult.js';
import { ExecutableCommand } from '@nan0web/protocol';
import { Model } from './Model.js';
import { ProjectModel } from './ProjectModel.js';
import { ModelError } from '@nan0web/types';
export { AppCore, AppResult, ExecutableCommand, Model, ProjectModel, ModelError };
