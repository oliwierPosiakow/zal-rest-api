# zal-rest-api
# 📚 REST API Biblioteki — Bun + TypeScript + Express

Projekt stworzony na zaliczenie przedmiotu z programowania backendowego.
Aplikacja udostępnia REST API do zarządzania **książkami, użytkownikami i wypożyczeniami** w prostej bibliotece.

---

## 🚀 Funkcjonalności

✅ CRUD dla książek (📖)
✅ CRUD dla użytkowników (👤)
✅ Wypożyczanie i zwracanie książek (📦)
✅ Częściowe aktualizacje (`PATCH`)
✅ Dokumentacja Swagger (📜)
✅ Harmonogram zadań (cron)
✅ Testy jednostkowe (opcjonalnie)
✅ Prosty system bazy danych SQLite (przez `better-sqlite3`)
✅ Aliasowanie ścieżek (`@models`, `@controllers`, `@routes`, itd.)
✅ Automatyczny reload w trybie deweloperskim (`bun --hot`)

---

## 🧩 Technologie

| Technologia | Zastosowanie |
|--------------|--------------|
| **Bun** | Uruchamianie aplikacji i zarządzanie zależnościami |
| **TypeScript** | Typowanie i bezpieczeństwo kodu |
| **Express.js** | Tworzenie REST API |
| **Swagger UI** | Dokumentacja endpointów |
| **Better SQLite3** | Lekka baza danych lokalna |
| **Prettier** | Formatowanie kodu |
| **tsx / Bun hot reload** | Automatyczny restart serwera podczas pracy |

---

## ⚙️ Instalacja

### 1️⃣ Zainstaluj zależności

```bash
bun install
```

### 2️⃣ Uruchom w trybie deweloperskim

```bash
bun run src/app
```
