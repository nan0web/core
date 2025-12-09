# @nan0web/core

Core application framework for nan0web providing a lightweight
DB‑backed state container with built‑in internationalisation.

|Package name|[Status](https://github.com/nan0web/monorepo/blob/main/system.md#написання-сценаріїв)|Documentation|Test coverage|Features|Npm version|
|---|---|---|---|---|---|
 |[@nan0web/core](https://github.com/nan0web/core/) |🟢 `99.1%` |🧪 [English 🏴󠁧󠁢󠁥󠁮󠁧󠁿](https://github.com/nan0web/core/blob/main/README.md)<br />[Українською 🇺🇦](https://github.com/nan0web/core/blob/main/docs/uk/README.md) |🟢 `95.3%` |✅ d.ts 📜 system.md 🕹️ playground |1.0.1 |

## Installation

How to install with npm?
```bash
npm install @nan0web/core
```

How to install with pnpm?
```bash
pnpm add @nan0web/core
```

How to install with yarn?
```bash
yarn add @nan0web/core
```

## Basic usage – AppCore

Create an `AppCore` instance with a mock DB and inspect its state.

How to instantiate AppCore?
```js
import { AppCore } from "@nan0web/core"
const db = new DB()
const core = new AppCore({ db, title: "Demo", uri: "/demo", locale: "en" })
console.info(core.title) // ← Demo
console.info(core.uri) // ← /demo
```
## Internationalisation bootstrap

Load translation JSON from the DB and obtain a translation function.

How does bootstrapI18n load translations?
```js
const db = new DB({
	predefined: [
		["i18n/uk.json", { "hello": "Вітаю!" }]
	]
})
await db.connect()
const core = new AppCore({ db, locale: "uk" })
await core.init()
const result = core.t("hello")
console.info(result) // ← Вітаю!
```
## State inspection

How to retrieve current state?
```js
const db = new DB()
const core = new AppCore({ db })
const state = core.state()
```
## AppResult helper

How to create an AppResult instance?
```js
import { AppResult } from "@nan0web/core"
const res = new AppResult({ content: "Done", priority: 2, meta: { ok: true } })
console.info(res.content[0]) // ← Done
```
## run() contract

The base `run` method throws an error – subclasses must implement it.

How does run() behave when not overridden?
```js
const db = new DB()
const core = new AppCore({ db })
await core.run() // ← throws an error → AppCore: run() must be implemented
```
## Contributing

How to contribute? - [check here](./CONTRIBUTING.md)

## License

How to license ISC? - [check here](./LICENSE)
