# @nan0web/core — Next Steps

> v1.1.2 — **test ✅ test:docs ✅ build ✅ knip ✅**
> Перевірено: 2026-03-18 — 19 tests, 13 docs, 0 fail

---

## ✅ Виконано (v1.0.4–1.1.2)

- [x] ProvenDoc — `CONTRIBUTING.md` + fix `loadDocument` для `.md`
- [x] Видалено 9 мертвих файлів (registry/_, system/_, bin/)
- [x] Виключено `README.md.js` з npm tarball
- [x] Конвеєр повністю зелений, опубліковано v1.0.5
- [x] **CORE-8 (частково)**: Додано `Model` — базова модель Model-as-Schema з `resolveDefaults` + `resolveAliases`
- [x] Додано `ProjectModel` — доменна модель для project.yaml з comma-separated tags
- [x] Експортовано `Model` та `ProjectModel` з index.js
- [x] Додано тести для Model + ProjectModel (19 tests total)
- [x] Виправлено ES class field initializer gotcha (instance fields overwrite super() data)
- [x] **CORE-13**: AppCore.from() polymorphism fix (inheritance stability for micro-apps)
- [x] Оновлено knip.json — ignoreDependencies для workspace:\* протоколу

---

## 📦 Поточний API (v1.1.0)

| Експорт             | Призначення                                                      |
| :------------------ | :--------------------------------------------------------------- |
| `AppCore`           | Базовий клас: DB + i18n bootstrap + state + abstract run()       |
| `AppResult`         | Уніфікована обгортка результатів виконання                       |
| `ExecutableCommand` | Реекспорт з `@nan0web/protocol`                                  |
| `Model`             | Базова модель Model-as-Schema (resolveDefaults + resolveAliases) |
| `ProjectModel`      | Доменна модель конфігурації проєкту (extends Model)              |

---

## 📊 Аналіз екосистеми: Хто дублює Model-as-Schema?

> 20+ моделей в монорепо використовують `resolveDefaults` напряму замість `extends Model`.
> Це порушує DRY та ускладнює додавання `validate()`, `toJSON()`, `toPlain()` у єдиному місці.

| Пакет                    | Моделі що дублюють паттерн                                                                                                                            |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@nan0web/ui`            | InputModel, SelectModel, TreeModel, TableModel, ButtonModel, SpinnerModel, ToastModel, ConfirmModel, AutocompleteModel, BreadcrumbModel, SandboxModel |
| `@nan0web/i18n`          | Language                                                                                                                                              |
| `@nan0web/catalog-watch` | CatalogIndexModel, CatalogWatcherModel                                                                                                                |
| `ui/adopt-agent`         | Blueprint, ReleasePlanner, EconomyCalculator                                                                                                          |

**Жоден** пакет ще не використовує `import { Model } from '@nan0web/core'`.

---

## 🔜 Наступні кроки

### CORE-8: Інтеграція Model у додатки (Migration Wave)

> Замінити дубльовані `resolveDefaults(X, this)` на `extends Model` у всіх пакетах.

**Критерій завершення**: `grep -r "resolveDefaults" packages/ --include="*.js" | grep -v core | grep -v types | grep -v test | grep -v node_modules` повертає 0 результатів.

Пріоритет міграції:

1. ⚠️ `@nan0web/i18n` → Language — **БЛОКОВАНО** циклічною залежністю (core→i18n→core). Seed: `i18n/docs/seed-model-migration.md`
2. ✅ `@nan0web/catalog-watch` → CatalogIndexModel, CatalogWatcherModel — без циклу. Seed: `catalog-watch/docs/seed.md` §6
3. ✅ `@nan0web/ui` → 12 моделей (InputModel, SelectModel, etc.) — без циклу. Seed: `ui/docs/seed-model-migration.md`
4. ✅ `ui/adopt-agent` → Blueprint, ReleasePlanner, EconomyCalculator — без циклу. Seed: `ui/adopt-agent/docs/seed-model-migration.md`

**Статус циклічності:**

- `core` → `db`, `i18n`, `protocol`, `types` (core залежить від i18n!)
- `i18n` → `db`, `db-fs`, `event`, `types` (i18n НЕ залежить від core)
- `ui` → `co`, `event`, `log`, `types` (ui НЕ залежить від core)
- `catalog-watch` → `db`, `event`, `types`, `ui` (catalog-watch НЕ залежить від core)
- Додавання `ui → core` та `catalog-watch → core`: ✅ безпечно
- Додавання `i18n → core`: ❌ цикл (core вже залежить від i18n)

### CORE-9: Відновлення Реєстрів (Component Registry)

> Коли з'являться реальні споживачі. Наразі `idle`.

### CORE-10: Вбудувати `resolveValidation` в Model

> `Model` має отримати метод `.validate()`, який викликає `resolveValidation(this.constructor, this)` з `@nan0web/types`.

```js
// Очікуваний API після CORE-10:
class UserModel extends Model {
  static email = {
    help: 'Email',
    default: '',
    errorInvalid: 'Invalid email',
    validate: (val) => val.includes('@') || UserModel.email.errorInvalid,
  }
}

const user = new UserModel({ email: 'bad' })
user.validate() // throws ModelError({ email: 'Invalid email' })
```

**Acceptance criteria:**

- [x] `Model.prototype.validate()` існує і делегує до `resolveValidation`
- [x] `ModelError` реекспортовано з `@nan0web/core`
- [x] Тести: pass / fail / compound errors
- [x] `ProjectModel` отримує валідатори (status in options, locale in LANGS)

### CORE-11: AppCore ↔ Model уніфікація

> `AppCore` конструктор використовує ручний деструктуринг — розглянути чи варто його робити `extends Model` або хоча б делегувати ініціалізацію.

Підзадачі:

- [x] Аналіз: чи AppCore може бути `extends Model` без ламання API
- [x] Якщо ні — як мінімум використати `resolveDefaults` для полів AppCore
- [x] `static UI` для AppCore (title, locale, uri — описати як Model-as-Schema)

### CORE-12: Стандартизація `static UI` мета-блоку

> `ProjectModel.UI.title = 'Project Data'` — це початок паттерну, але він не формалізований.

Підзадачі:

- [x] Визначити контракт для `static UI` (title, description, icon?)
- [x] Документувати в system.md
- [x] Додати тест на контракт у README.md.js

### CORE-13: AppCore Inheritance Stability

> `.from()` метод в `AppCore` раніше створював екземпляр базового класу, що ламало успадкування методу `run()`.

- [x] Виправлено `.from()`: `new AppCore(input)` → `new this(input)`
- [x] Тести: Перевірка через `Element.jsx` (UIRoot) підтвердила завантаження спадкоємців

---

## 🛡 Архітектурні обмеження

1. **Без циклічних залежностей** — `core` не може залежати від `ui`, `catalog-watch` тощо
2. **Model не замінює AppCore** — це різні шари: Model = Data, AppCore = Runtime
3. **resolveDefaults / resolveAliases / resolveValidation** — лишаються у `@nan0web/types`, core лише реекспортує через Model
4. **ES class field gotcha** — підкласи Model НЕ мають оголошувати `field = default` (це перетирає super())
