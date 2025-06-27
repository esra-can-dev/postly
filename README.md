# Postly 📬

A Vue 3 + PrimeVue application to browse and manage user posts using [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) and built with **Vite**.

## 🚀 Live Demo

The app is deployed on Google Cloud Run and accessible at:
▶️ [Live App (Google Cloud Run)](https://postly-837290552047.europe-west1.run.app/)

---

## ⚙️ Tech Stack

- **Frontend**: Vue 3 + Vite (Composition API)
- **PrimeVue** (UI Components)
- **Vue Router** – Client-side routing
- **TailwindCSS** (Utility-first CSS)
- **Vee-Validate + Yup** (Form validation)
- **Vite** (Build tool)
- **Google Cloud Run** (Deployment)
- **Testing**:
  - ✅ Unit Testing with [Vitest](https://vitest.dev)
  - ✅ End-to-End Testing with [Cypress](https://www.cypress.io)

---

## 🧩 Features

### 🧑 Users Page

- Fetches and displays all users in a table
- Users' names are clickable and route to their detail pages

### 👤 User Detail Page

- Left section shows user information (with placeholder image)
- Right section shows:
  - List of user's posts (paginated, 3 per page)
  - Add Post form (title + content)
  - Delete post functionality

---

## ⚙️ Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/esra-can-dev/postly.git
   cd postly
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:3000

- Build for production:

  ```bash
  npm run build
  ```

- Preview production build:

  ```bash
  npm run preview
  ```

---

### 🧪 Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### 🧪 Run E2E Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)

---

### 📝 Notes

- **JSONPlaceholder** is a mock API; POST and DELETE requests respond successfully but do **not persist** data.
- Pagination is initially handled via `_start` and `sh_limit` query parameters, e.g. `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=3`
- However, once a new post is added or a post is deleted, **all post state is managed locally**, including pagination logic. No further GET requests are made to the API after that point.
- Form validation is handled with **vee-validate** and \*\*yup--.
