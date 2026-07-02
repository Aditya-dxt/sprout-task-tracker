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

### 🔐 Accounts & Data Isolation
- Sign up / log in with email + password (bcrypt-hashed, JWT sessions)
- Every task is scoped to its owner — the backend filters every single query by
  the authenticated user's ID, so one account's tasks can never appear in
  another account's board, structurally, not just by convention
- Ready for a future mobile app: the same REST + JWT API can be reused as-is

### ⚡ Real-Time Sync
- Socket.io connection authenticated with the same JWT
- Each user joins a private room keyed to their own ID — updates only ever
  reach that user's own open tabs/devices, never anyone else's
- Create, edit, delete, or drag a task in one tab and watch it update instantly
  in another, with no manual refresh

### ✅ Core Task Management
- Full CRUD — create, view, update, and delete tasks
- Drag-and-drop between *To Do → In Progress → Done*
- Client- and server-side form validation (title required, length limits)
- Inline confirm-before-delete (no accidental deletes)
- Sort each column by newest, due date, or priority

### 🔍 Organization
- Live search across task titles
- Filter by priority (low / medium / high)
- Due dates with automatic overdue highlighting
- Overall completion progress ring in the header

### 🎨 Experience
- Light **and dark** botanical-themed UI with rich micro-animations
- Growth-stem indicator on every card that visually reflects task status
- Toast notifications, skeleton loading states, empty-state illustrations
- Fully responsive with a dedicated mobile nav — usable down to small phone widths
- Dynamic updates with no page refresh (pure client-side state + REST + sockets)

### ⚙️ Engineering
- REST API with proper error handling and status codes
- MongoDB schema validation via Mongoose
- Environment-variable driven config (frontend + backend)
- Clean separation of concerns (routes / controllers / models / middleware)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 · Vite · Axios · Socket.io-client · plain CSS (no UI framework) |
| **Backend** | Node.js · Express · Mongoose · Socket.io · JWT · bcryptjs |
| **Database** | MongoDB (Atlas) |
| **Drag & Drop** | Native HTML5 Drag and Drop API (zero extra dependencies) |

---

## 📂 Project Structure

```
tasktracker/
├── backend/               # Express + MongoDB REST API
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/generateToken.js
│   └── server.js
└── frontend/               # React (Vite) client
    └── src/
        ├── api/
        │   ├── auth.js
        │   ├── tasks.js
        │   └── socket.js
        ├── context/AuthContext.jsx
        ├── pages/AuthScreen.jsx
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
| Authentication (JWT, bcrypt, protected routes) | ✅ Done |
| Multi-user data isolation (every query scoped to owner) | ✅ Done |
| Real-time sync (Socket.io, per-user private rooms) | ✅ Done |
| Frontend — board, drag-and-drop, modal form, search/filter/sort | ✅ Done |
| MongoDB integration (Mongoose models + schema validation) | ✅ Done |
| Responsive layout (mobile → desktop, dedicated mobile nav) | ✅ Done |
| Dark mode | ✅ Done |
| Animations (card entrance, growth stem, bloom, toasts) | ✅ Done |
| Deployment (backend + frontend on public URLs) | ⏳ In progress |

---

## 🚀 Run It Locally

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env       # fill in MONGO_URI and a random JWT_SECRET
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

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create an account |
| POST | `/api/auth/login` | No | Log in, receive a JWT |
| GET | `/api/auth/me` | Yes | Get the current user |
| GET | `/api/tasks` | Yes | List the current user's tasks |
| GET | `/api/tasks/:id` | Yes | Get one task (must be owned by caller) |
| POST | `/api/tasks` | Yes | Create a task |
| PUT | `/api/tasks/:id` | Yes | Update a task (must be owned by caller) |
| DELETE | `/api/tasks/:id` | Yes | Delete a task (must be owned by caller) |

Authenticated requests send `Authorization: Bearer <token>`.

---

## ☁️ Deployment

**Database — MongoDB Atlas**
Free cluster, database user, and IP allowlist set up at [cloud.mongodb.com](https://cloud.mongodb.com).

**Backend — Render**
Root directory `backend`, build command `npm install`, start command `npm start`, with `MONGO_URI`, `JWT_SECRET`, and `PORT` set as environment variables.

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