# 🌱 core — Seed (CORE-13): AppCore Inheritance Stability

## Намір
Забезпечити стабільність успадкування для базового класу `AppCore`, щоб метод `.from()` коректно створював екземпляри підкласів.

## Проблема
Метод `AppCore.from(input)` був реалізований як:
```js
static from(input) {
  if (input instanceof AppCore) return input
  return new AppCore(input)
}
```
Це призводило до того, що під час виклику `MySubApp.from(props)` (який успадковано) створювався екземпляр `AppCore`, а не `MySubApp`. 
Як наслідок, всі перевизначені методи (наприклад `run()`) ігнорувалися, що ламало архітектуру мікро-додатків у `UIRoot`.

## Рішення (Polymorphic Factory)
Використання `this` у статичному контексті для посилання на конкретний клас, з якого викликано метод:

```js
static from(input) {
  if (input instanceof this) return input
  return new this(input)
}
```

## Статус
✅ Впроваджено у версії `1.1.2` (patch).
✅ Перевірено інтеграційними тестами в `industrialbank/branches`.
