# Seed: Release v1.1.2 @nan0web/core

Objective: Break circular dependency with `@nan0web/i18n` while maintaining backward compatibility.

## Changes
- [x] **Model Re-export**: `src/Model.js` now imports and re-exports `Model` from `@nan0web/types`.
- [x] **Dependencies**: Updated `@nan0web/types` to `^1.6.0` to use the new `Model` class.
- [x] **Version Hygiene**: Explicit version matching for `pnpm` workspace sync.

## Release Instructions
1. First, publish `@nan0web/types` v1.6.0+.
2. Then, run `pnpm install` in core to update local symlinks to latest types.
3. Run `pnpm test:all` to ensure `Model` re-export works correctly.
4. Publish with `nan0release publish`.
