# 💻 Rove Client (Frontend)

Welcome to the frontend application for **Rove**, built using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.7.

This client interfaces with the [Rove API](../README.md) to provide a rich, responsive interface for community connection, profiles, photo galleries, and messaging.

---

## 🛠️ Technology Stack

* **Framework:** [Angular 21](https://angular.dev/)
* **CSS Framework:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Component Library:** [DaisyUI v5](https://daisyui.com/)
* **State & Flow:** Signals-based architecture and RxJS streams
* **Unit Testing:** [Vitest](https://vitest.dev/)

---

## 🚀 Quick Start

### 1. Install Dependencies
Make sure you are in the `/client` directory, then run:
```bash
npm install
```

### 2. Start the Development Server
```bash
npm start
```
* Once started, open your browser and navigate to `http://localhost:4200/`.
* The application will automatically reload whenever you modify any source files.

### 3. Running Unit Tests
To execute unit tests using the **Vitest** test runner:
```bash
npm run test
```

### 4. Build for Production
To compile the project and store the optimized build artifacts in the `dist/` directory:
```bash
npm run build
```

---

## 📂 Code Layout

```text
src/
├── app/                  # Application routing, configuration, and root component
├── core/                 # Core utilities
│   ├── guards/           # Route guards (Auth guard, unsaved changes prevention)
│   ├── interceptors/     # Http interceptors (JWT injection, error handling)
│   ├── pipes/            # Reusable pipes
│   └── services/         # Services for API communication (Account, Member, Toast)
├── features/             # App features & page components
│   ├── account/          # Register / login components
│   ├── home/             # Landing / welcome component
│   ├── members/          # Member lists, profile editing, photo uploading, & messages
│   ├── messages/         # Main messages interface
│   └── test-errors/      # Error handling test interface
├── shared/               # Shared presentation elements and layouts
│   ├── errors/           # Not Found & Server Error display pages
│   └── navigation/       # Top navigation bar & menus
└── types/                # TypeScript interfaces and type definitions
```

---

## 🔗 Related Documentation
* [Root Project README](../README.md) - For the complete API setup guide, SQLite database configurations, and Docker instructions.
