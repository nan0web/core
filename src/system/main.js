import RouteRegistry from '../registry/RouteRegistry.js'
import CommandRegistry from '../registry/CommandRegistry.js'
import SystemValidator from './Validator.js'

/**
 * System bootstrapper
 * Integrates all applications into shared infrastructure
 *
 * Flow:
 * 1. Create registries
 * 2. Validate integrations
 * 3. Register conflict‑free apps
 * 4. Start services
 */
async function bootstrapSystem() {
	// Create shared registries
	const apiRegistry = new RouteRegistry()
	const cliRegistry = new CommandRegistry()

	// Setup validator with all registries
	const validator = new SystemValidator({
		apiRegistry,
		cliRegistry,
	})

	// Import and validate auth application
	const { default: authApp } = await import('@nan0web/auth.app/src/register.js')
	const validationErrors = validator.validate(authApp, {
		api: { prefix: 'auth' },
		cli: { command: 'auth' },
	})

	// Handle potential conflicts
	if (validationErrors.length > 0) {
		console.error('❌ Integration conflicts detected:', validationErrors)
		console.log('Resolve with: authApp.register({ api: { prefix: "auth2" } })')
		process.exit(1)
	}

	// Register validated application
	const { api, cli, react } = authApp.register({
		api: { prefix: 'auth' },
		cli: { command: 'auth' },
	})

	api.setup(apiRegistry)
	cliRegistry.register(cli.command, cli.setup)
	if (react && typeof react.setup === 'function') {
		react.setup(/* component registry placeholder */)
	}

	// Start infrastructure services
	startApiServer(apiRegistry)
	startCliProcessor(cliRegistry)
}

/* ---------- Helper stubs for build (replace with real implementations) ---------- */
function startCliProcessor(registry) {
	console.log('⚙️ CLI processor started with', registry.getCommands().size, 'commands')
}
function createHttpServer() {
	return {
		use: (path, handler) => console.log(`🔌 Route mounted: ${path}`),
		listen: (port) => console.log(`🚀 HTTP server listening on port ${port}`),
	}
}
/* --------------------------------------------------------------------------- */

bootstrapSystem().catch(console.error)

/**
 * Start API server with registered routes
 * @param {RouteRegistry} registry
 */
function startApiServer(registry) {
	const server = createHttpServer()
	for (const [prefix, { setup }] of registry.getRoutes()) {
		server.use(`/${prefix}`, setup)
	}
	server.listen(420)
}
