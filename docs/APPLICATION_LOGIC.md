# Логика работы приложения (ChatAI / PicTalk)

Документ описывает **алгоритмы навигации**, **состояние**, **валидации** и **связи между модулями**. Его можно дополнять по мере развития продукта.

### Сценарий «с нуля» (как видит пользователь)

1. **Приветствие** (`/welcome`) — короткий экран с названием приложения и кнопкой **GET STARTED**. Нажали — сохраняется согласие с welcome и открывается онбординг.
2. **Телефон** (шаг 1 онбординга) — просим номер в формате США (NANP), подсказка про код из SMS (логика верификации пока только в копирайте).
3. **Имя** (шаг 2) — как вас показывать контактам.
4. **Аватар** (шаг 3, **необязательно**) — можно загрузить фото как иконку профиля или нажать **Skip** и закончить без фото → в приложение (`/chats`).

Технически шаги 2–4 — один маршрут `/onboarding`, внутренний счётчик `step` (1 | 2 | 3).

---

## 1. Стек и роль модулей

| Слой | Технология |
|------|------------|
| UI | Angular (standalone), Ionic |
| Маршрутизация | Angular Router (`app.routes` → `shell.routes` → feature routes) |
| Локальное состояние | `localStorage`, Angular `signal` / `computed` |
| Данные чатов (текущий мок) | `ChatRepository`, моки в `features/chat/mock`, `features/dialog/mock` |

Реального бэкенда для онбординга нет: телефон, имя и фото хранятся только в браузере.

---

## 2. Граф маршрутов

```
/welcome                    → WelcomePage
/onboarding                 → OnboardingPage (lazy, guard)
/                           → ShellPage (canMatch: онбординг завершён)
  /chats                    → ChatsPage
  /chats/thread/:id         → ChatDetailPage
  /contacts                 → ContactsPage
  /settings                 → SettingsPage
  /lab                      → LabPage
  ''                        → redirect → /chats
  **                        → redirect → /chats
** (глобальный)             → redirect → /welcome
```

Файлы:

- Корень: `src/app/app.routes.ts`
- Оболочка: `src/app/shell/shell.routes.ts`
- Чаты: `src/app/features/chat/chat.routes.ts`
- Онбординг: `src/app/features/onboarding/onboarding.routes.ts`

---

## 3. Алгоритм «куда попасть при входе»

Используются два независимых флага в `localStorage`:

1. **Welcome** — `hasAcceptedWelcome()` (`welcome.storage.ts`, ключ `pictalk-welcome-accepted-v1`).
2. **Онбординг завершён** — `OnboardingService.completed()` (`completedAt` не пустой в `pictalk-onboarding-v1`).

### 3.1. Страница `/welcome` (`WelcomePage.ngOnInit`)

```
ЕСЛИ onboarding.completed()
  → navigate /chats (replaceUrl)
ИНАЧЕ ЕСЛИ hasAcceptedWelcome()
  → navigate /onboarding (replaceUrl)
ИНАЧЕ
  → остаёмся на welcome
```

Кнопка **Get started**: `acceptWelcome()` → `navigate /onboarding`.

### 3.2. Страница `/onboarding` (`OnboardingPage.ngOnInit`)

```
ЕСЛИ НЕ onboarding.completed() И НЕ hasAcceptedWelcome()
  → navigate /welcome (replaceUrl)
ИНАЧЕ
  → синхронизировать phoneNationalDigits из snapshot (localStorage)
```

Guard `onboardingIncompleteOnlyCanActivate`: если онбординг уже завершён → редирект на `/chats`.

### 3.3. Корень приложения `path: ''` (`onboardingCompleteCanMatch`)

```
ЕСЛИ onboarding.completed()
  → разрешить загрузку Shell (дети: /chats, …)
ИНАЧЕ
  → canMatch = false (маршрут не матчится)
```

При несовпадении срабатывает следующий маршрут; глобальный `**` ведёт на `/welcome`.

**Итоговая матрица (упрощённо):**

| completed | welcome accepted | Типичный первый экран |
|-----------|------------------|------------------------|
| да | * | `/chats` (из welcome или напрямую) |
| нет | нет | `/welcome` |
| нет | да | `/onboarding` |

---

## 4. Состояние онбординга

### 4.1. Модель (`onboarding.types.ts`)

| Поле | Смысл |
|------|--------|
| `phone` | Строка отображения/хранения (формат `+1 (NPA) NXX-XXXX` после ввода) |
| `displayName` | Имя |
| `photoDataUrl` | Data URL или `null` |
| `completedAt` | ISO-дата завершения или `null` |

Ключ в `localStorage`: `pictalk-onboarding-v1`. Чтение/запись: `onboarding.storage.ts`. Сервис: `OnboardingService` — единственная точка обновления и `complete()`.

### 4.2. Шаги UI (`OnboardingPage`, `step`: 1 | 2 | 3)

1. **Телефон** — ввод только цифр NANP (10 национальных), отображение через `us-phone-format.ts` (`phoneDisplay()`). Каждый `input` → `nationalDigitsFromRawInput` → `phoneNationalDigits` + `updatePhone` в сервис.
2. **Имя** — `nameDraft`, `nameValid`: длина trim ≥ 2.
3. **Аватар (по желанию)** — выбор файла как фото профиля / иконки (JPEG/PNG/WebP), лимит ~450 KB (`photoFileTooLarge`), превью в Data URL; можно **Skip** или **Done** с фото.

Завершение: `OnboardingService.complete()` (проставляет `completedAt`) → `navigate /chats`.

Назад: шаг 2 → `backToPhone()` (шаг 1); шаг 3 → `backToName()` (шаг 2).

### 4.3. Валидация телефона (`OnboardingService.phoneValid`)

Алгоритм:

1. Из строки взять только цифры.
2. Если 11 цифр и первая `1` — отбросить ведущую `1`.
3. Должно остаться **ровно 10** цифр.
4. **NPA** (позиции 0–2): первая цифра не `0` и не `1`.
5. **NXX** (позиции 3–5): первая цифра блока (индекс 3) не `0` и не `1`.

Иначе номер невалиден (кнопка Continue на шаге 1 disabled).

---

## 5. Оболочка приложения (`ShellPage`)

- Один **`IonRouterOutlet`** для дочерних маршрутов.
- Нижняя навигация из `main-nav.config.ts`: **Chats**, **Contacts**, **Settings**, **Lab** — ссылки на префиксы URL; активность по `router.url` (`isNavActive`).

Важно: список чатов и тред — **соседние** child routes (`/chats` и `/chats/thread/:id`), без вложенного второго outlet внутри страницы (см. комментарий в `chat.routes.ts`).

---

## 6. Экраны основного приложения (кратко)

| Путь | Компонент | Логика |
|------|-----------|--------|
| `/chats` | `ChatsPage` | Список тредов из `ChatRepository.getThreads()` (fallback мок `CHAT_THREADS`), переход `openThread(id)` → `/chats/thread/:id` |
| `/chats/thread/:id` | `ChatDetailPage` | `threadId` из route; метаданные треда из `threadById`; лента сообщений из мока `CHAT_TRANSCRIPT`; модалка превью/редактирования prompt для пузыря |
| `/contacts` | `ContactsPage` | (контент по мере реализации) |
| `/settings` | `SettingsPage` | (контент по мере реализации) |
| `/lab` | `LabPage` | вспомогательный/экспериментальный экран |

---

## 7. Общие технические детали

- **`ClearStuckIonPageHostDirective`** — подключается на ключевых страницах как `hostDirectives`, чтобы снижать проблемы с застреванием Ionic page transitions.
- **Иконки** — регистрация в `register-ion-icons.ts` (например `arrow-forward-outline` для онбординга).

---

## 8. Куда дописывать новую логику

| Тема | Файл / папка |
|------|----------------|
| Новый корневой экран | `app.routes.ts` |
| Новый таб внизу | `shell/main-nav.config.ts` + `shell.routes.ts` |
| Правила онбординга | `onboarding.service.ts`, `onboarding.page.ts`, этот документ §4 |
| Формат телефона США | `features/onboarding/us-phone-format.ts` |
| Правила welcome | `welcome.storage.ts`, `welcome.page.ts` |
| Данные чатов | `data/chat.repository.ts`, моки в `features/chat`, `features/dialog` |

---

*Последнее обновление структуры: по состоянию репозитория на момент создания файла.*
