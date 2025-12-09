#!/usr/bin/env node
import fs from 'node:fs/promises'
import configPath from '../config/apps.json' assert { type: 'json' }

async function addApp(identifier) {
	const config = JSON.parse(await fs.readFile(configPath, 'utf-8'))

	// Визначення типу ідентифікатора
	const isLocal = identifier.startsWith('/') || identifier.startsWith('.') || identifier.startsWith('~')
	const isUrl = identifier.startsWith('http://') || identifier.startsWith('https://')
	const isNpm = !isLocal && !isUrl

	const packageName = isNpm ? identifier : identifier.split('/').pop().replace(/\.git$/, '')
	config.apps[packageName] = {}

	await fs.writeFile(configPath, JSON.stringify(config, null, 2))
	console.log(`✅ Added ${packageName} to configuration. Run "nan0web setup" to complete installation.`)
}

async function setupApps() {
	const { AppIntegrator } = await import('../system/integrator.js')
	await new AppIntegrator().registerAll()
	console.log('✅ All configured applications registered')
}

const [command, identifier] = process.argv.slice(2)
command === 'add' ? addApp(identifier) : setupApps()
