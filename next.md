# @nan0web/core — Next Steps

> Статус: **test ✅ → test:docs ✅ → build ✅ → knip ✅** — повний конвеєр зелений

---

## ✅ Виконано

- [x] **CORE-1**: ProvenDoc — `CONTRIBUTING.md` скопійовано
- [x] **CORE-2**: ProvenDoc — виправлено `loadDocument` для `.md` файлів
- [x] **CORE-3**: Видалено `registry/` (5 файлів) — мертвий код
- [x] **CORE-4**: Видалено `system/` (3 файли) — мертвий код
- [x] **CORE-5**: Видалено `bin/nan0web.js` — не підключений, зламаний

## 📦 Поточний API (чистий мінімум)

- `AppCore` — базовий клас: DB + i18n bootstrap + state + abstract run()
- `AppResult` — обгортка результатів виконання
- `ExecutableCommand` — реекспорт з `@nan0web/protocol`

## 🔜 Наступні кроки

- [ ] **CORE-8**: Підключити `@nan0web/core` як базу в `apps/*` (auth.app, editor.app, тощо)
- [ ] **CORE-9**: Версія 1.1.0 — реєстри повернути, коли з'являться реальні споживачі
