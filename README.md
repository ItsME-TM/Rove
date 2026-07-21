# 🌌 Rove - Social Community & Matchmaking Platform

Rove is a premium, modern social community and matchmaking application. It features a high-performance backend built on **.NET 10 Web API** and a client-side interface powered by **Angular 21**, styled with **Tailwind CSS v4** and **DaisyUI v5**.

---

## 🛠️ Tech Stack & Architecture

### Backend (API)
* **Runtime:** [.NET 10.0](https://dotnet.microsoft.com/)
* **Database & ORM:** [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) with **PostgreSQL** (via Npgsql)
* **Authentication:** JWT Bearer Token authentication with PBKDF2 secure password hashing & unique salting
* **Media Handling:** [Cloudinary API](https://cloudinary.com/) for optimized cloud-based photo storage and automatic face-centered cropping
* **Middleware:** Global Exception Handling middleware for standardized API error responses

### Frontend (Client)
* **Framework:** [Angular 21](https://angular.dev/) (latest v21.2.7)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI v5](https://daisyui.com/)
* **State Management:** Angular Signals & RxJS
* **Testing:** [Vitest](https://vitest.dev/) for fast unit testing
* **Features:** Router Guards (Auth, Unsaved Changes prevention), Route Resolvers, interceptors for JWT injection, and loading states.

---

## ✨ Features

- 👤 **Profile Management:** Complete profile editing page with custom fields (DisplayName, City, Country, Description, Gender).
- 🔐 **Secure Authentication:** JWT-based user register/login flow.
- 📸 **Cloud-Based Photo Uploads:** Seamless image uploads to Cloudinary with automatic resizing and face centering.
- 🖼️ **Photo Controls:** Real-time main photo selection and Cloudinary-synced photo deletion.
- 🔄 **Stateful UX:** Dynamic loading spinners, custom notifications/toasts, and protection of unsaved profile changes when navigating away.
- 🐳 **Docker-Compose Ready:** Simple one-command deployment for development with PostgreSQL.
- 🚀 **CI/CD Ready:** GitHub Actions workflow for building, testing, and deploying Docker images.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
* [Node.js](https://nodejs.org/) (v20+ recommended)
* [.NET 10.0 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for containerized setup)
* [Git](https://git-scm.com/)

---

### 📦 Backend Setup (`/API`)

1. **Clone the repository** and navigate to the project directory.
2. **Create configuration:**  
   Copy the example configuration file:
   ```bash
   cp API/appsettings.json.example API/appsettings.json
   ```
3. **Configure Secrets:**  
   Open `API/appsettings.json` and configure your settings:
   * Define a secure `TokenKey` (minimum 64 characters long).
   * Fill in your Cloudinary API credentials:
     ```json
     "CloudinarySettings": {
       "CloudName": "your-cloud-name",
       "ApiKey": "your-api-key",
       "ApiSecret": "your-api-secret"
     }
     ```
   * **Database Connection:**  
     If using Docker Compose (see below), the connection string is already set via environment variables.  
     For a local PostgreSQL instance, adjust the `ConnectionStrings.DefaultConnection` accordingly, e.g.:
     ```json
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Port=5432;Database=rove;Username=your_user;Password=your_password"
     }
     ```
4. **Run Migrations & Database Seed:**  
   From the root of the project, run:
   ```bash
   dotnet ef database update --project API
   ```
   *(Note: The database seeds automatically with sample user data on startup if empty)*
5. **Start the API:**  
   ```bash
   dotnet run --project API
   ```
   The backend will be available at `http://localhost:5001`.

---

### 💻 Frontend Setup (`/client`)

1. **Navigate to client directory:**
   ```bash
   cd client
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Start Development Server:**
   ```bash
   npm start
   ```
   Open your browser and visit `http://localhost:4200/`.
4. **Run Unit Tests:**
   ```bash
   npm test
   ```

---

## 🐳 Docker Deployment

To launch the full stack (API + PostgreSQL) using Docker Compose:

```bash
docker-compose up --build
```

This will:
* Build the ASP.NET Core API and Angular client (multi‑stage Dockerfile).
* Start a PostgreSQL 15 database (persisted via a named volume `pgdata`).
* Expose the API on host port **5001**.

**docker-compose.yml** (already in the repository):
```yaml
version: "3.8"
services:
  db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: rove
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"
  api:
    build:
      context: .
      dockerfile: API/Dockerfile
      args:
        DOTNET_VERSION: 10.0
    ports:
      - "5001:5001"
    environment:
      ASPNETCORE_ENVIRONMENT: Development
      ASPNETCORE_URLS: http://+:5001
      ConnectionStrings__DefaultConnection: "Host=db;Port=5432;Database=rove;Username=user;Password=password"
    depends_on:
      - db
volumes:
  pgdata:
```

To stop and remove containers:
```bash
docker-compose down
```

---

## 🚀 CI/CD (GitHub Actions)

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
1. Triggers on pushes to `main` and pull requests.
2. Sets up .NET 10 and Node.js.
3. Restores dependencies, runs tests, and builds the Docker image.
4. Pushes the image to a container registry (configure via repository secrets).
5. Optionally deploys to a staging/production environment.

You can customize the workflow by adding your own registry credentials (e.g., `REGISTRY_USERNAME`, `REGISTRY_PASSWORD`) and deployment targets.

---

## 📂 Repository Structure

```text
├── .github/          # GitHub configuration and workflows
├── API/              # ASP.NET Core 10 Web API project
│   ├── Controllers/  # Route handlers (Auth, Members, Buggy)
│   ├── Data/         # DbContext, Migrations, and Seeding logic
│   ├── DTOs/         # Data Transfer Objects
│   ├── Entities/     # DB Entities (AppUser, Member, Photo)
│   ├── Helpers/      # Config helpers and Cloudinary mappings
│   ├── Services/     # Token and Photo (Cloudinary) business logic
│   └── Program.cs    # Application bootstrap & dependency injection
├── client/           # Angular 21 SPA Frontend
│   ├── src/
│   │   ├── app/      # Core routing and bootstrap configuration
│   │   ├── core/     # Interceptors, guards, and services
│   │   ├── features/ # Feature modules (home, members, account, etc.)
│   │   └── shared/   # Reusable layouts, UI components, and error views
│   └── package.json  # NPM dependencies & scripts
├── docker-compose.yml# Container orchestration for API + PostgreSQL
├── Dockerfile        # Multi‑stage build (client + API) located at API/Dockerfile
└── Rove.sln          # .NET Solution file
```

---

## 📜 License

This project is licensed under the MIT License.

--- 

*Happy coding!* 🚀