<div align="center">

# 🌱 Sprout
### Task Tracker That Grows With You

**A full-stack MERN task tracker where every task visually grows — from seed, to sprout, to bloom.**
Create, organize, and move tasks across a living Kanban board that reflects your progress, not just your to-do list.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

</div>

---

## 🖼️ Preview

> *(Drop a screenshot of the board here — drag a PNG into this file on GitHub)*

![Sprout Preview](frontend/public/preview.png)

---

## 🧩 What Is Sprout?

**Sprout** is a task tracker built around a simple idea: progress should feel like growth, not just a status change.

Every task starts as a **seed** in *To Do*, grows leaves as it moves to *In Progress*, and **blooms** the moment it's marked *Done* — complete with a small celebratory animation. The whole board, from column headers to individual task cards, carries that same botanical thread, turning an otherwise plain CRUD app into something that feels alive.

Under the hood, it's a clean, fully working MERN stack application: a REST API backed by MongoDB, and a React (Vite) frontend with real drag-and-drop, validation, filtering, and zero page reloads.

---

## ✨ Features

### ✅ Core Task Management
- Full CRUD — create, view, update, and delete tasks
- Drag-and-drop between *To Do → In Progress → Done*
- Client- and server-side form validation (title required, length limits)

### 🔍 Organization
- Live search across task titles
- Filter by priority (low / medium / high)
- Due dates with automatic overdue highlighting

### 🎨 Experience
- Light, botanical-themed UI with rich micro-animations
- Growth-stem indicator on every card that visually reflects task status
- Toast notifications, skeleton loading states, empty-state illustrations
- Fully responsive — mobile drawer-friendly layout down to small screens
- Dynamic updates with no page refresh (pure client-side state + REST calls)

### ⚙️ Engineering
- REST API with proper error handling and status codes
- MongoDB schema validation via Mongoose
- Environment-variable driven config (frontend + backend)
- Clean separation of concerns (routes / controllers / models)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 · Vite · Axios · plain CSS (no UI framework) |
| **Backend** | Node.js · Express · Mongoose |
| **Database** | MongoDB (Atlas) |
| **Drag & Drop** | Native HTML5 Drag and Drop API (zero extra dependencies) |

---

## 📂 Project Structure
```
tasktracker/
├── backend/               # Express + MongoDB REST API
│   ├── config/db.js
│   ├── controllers/taskController.js
│   ├── models/Task.js
│   ├── routes/taskRoutes.js
│   └── server.js
└── frontend/               # React (Vite) client
└── src/
├── api/tasks.js
├── components/
├── hooks/useTasks.js
├── App.jsx
└── index.css

```

---

## 🎨 Design Direction

| Element | Choice |
|---|---|
| **Name** | *Sprout* — because tasks, like plants, grow through visible stages |
| **Palette** | Pale sage-white base · leaf green primary · coral bloom accent · sun amber highlight |
| **Typography** | Fraunces (headlines, italic accents) · Plus Jakarta Sans (body) · JetBrains Mono (dates, counts) |
| **Signature Element** | The growth-stem — a small animated SVG stalk on every card that sprouts leaves and blooms as the task progresses |

---

## 📊 Project Status

| Area | Status |
|---|---|
| Backend API — CRUD, validation, error handling | ✅ Done |
| Frontend — board, drag-and-drop, modal form, search/filter | ✅ Done |
| MongoDB integration (Mongoose models + schema validation) | ✅ Done |
| Responsive layout (mobile → desktop) | ✅ Done |
| Animations (card entrance, growth stem, bloom, toasts) | ✅ Done |
| Deployment (backend + frontend on public URLs) | ⏳ In progress |
| Bonus: notifications / reusable component docs | ✅ Done (toasts, componentized UI) |

---

## 🚀 Run It Locally

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env       # fill in your real MONGO_URI
npm run dev                 # → http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env        # points VITE_API_URL at http://localhost:5000/api
npm run dev                  # → http://localhost:5173
```

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## ☁️ Deployment

**Database — MongoDB Atlas**
Free cluster, database user, and IP allowlist set up at [cloud.mongodb.com](https://cloud.mongodb.com).

**Backend — Render**
Root directory `backend`, build command `npm install`, start command `npm start`, with `MONGO_URI` and `PORT` set as environment variables.

**Frontend — Vercel**
Root directory `frontend`, build command `npm run build`, output directory `dist`, with `VITE_API_URL` pointing at the deployed backend's `/api` route.

---

## 🔮 Next Steps

1. Deploy backend to Render and frontend to Vercel, then update `VITE_API_URL` to the live backend URL
2. Add a real preview screenshot of the board
3. Optional bonus polish: task sorting, drag reordering within a column

---

## 📄 License

MIT — open source and free to use.

---

<div align="center">
  Grow one task at a time 🌱<br/>
  by <a href="https://github.com/Aditya-dxt">Aditya Dixit</a>
</div>
