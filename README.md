# GRAMSETU — Rural Village Portal

A full-stack web portal connecting rural villages with government services, schemes, and grievance management. Built with React + Express + PostgreSQL.

## Features

- 🏛️ **Government Schemes** — Browse and search schemes by category (Agriculture, Health, Housing, Employment, Education) with eligibility, benefits, and documents
- 📍 **Village Services** — Find hospitals, schools, banks, panchayat offices and more
- 📝 **Grievance Filing** — Submit complaints with auto-generated ticket IDs
- 🔍 **Grievance Tracking** — Track complaint status in real-time
- 🌐 **Multilingual** — English, Hindi (हिंदी), and Telugu (తెలుగు)
- 🛡️ **Admin Panel** — Manage and update grievance statuses

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Tailwind CSS |
| Backend | Express.js, TypeScript |
| Database | PostgreSQL + Drizzle ORM |
| Routing | Wouter |
| Data Fetching | TanStack Query |

## Project Structure

```
gramsetu/
├── client/              # React frontend
│   ├── index.html
│   └── src/
│       ├── components/  # Layout, Navbar, Footer
│       ├── pages/       # Home, Schemes, Services, Grievance, Track, Admin
│       ├── hooks/       # useLang (multilingual)
│       └── lib/         # api.ts helper
├── server/              # Express backend
│   ├── index.ts         # App entry point
│   ├── routes.ts        # API routes
│   └── storage.ts       # Database operations
├── shared/
│   └── schema.ts        # Drizzle DB schema + Zod types
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── drizzle.config.ts
```

## Setup & Run Locally

### 1. Prerequisites
- Node.js 18+
- PostgreSQL database

### 2. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/GRAMSETU.git
cd GRAMSETU
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env and set your DATABASE_URL
```

### 4. Push DB Schema
```bash
npm run db:push
```

### 5. Start Development
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Deploy on Render

1. Create a new **PostgreSQL** database on Render
2. Create a new **Web Service** pointing to this repo
3. Set environment variables:
   - `DATABASE_URL` — from Render PostgreSQL
   - `NODE_ENV=production`
4. Build command: `npm install && npm run build`
5. Start command: `npm start`

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/schemes` | List schemes (filter: `?category=&search=`) |
| GET | `/api/schemes/:id` | Get single scheme |
| GET | `/api/services` | List services (filter: `?type=`) |
| POST | `/api/grievances` | Submit grievance |
| GET | `/api/grievances/track/:ticketId` | Track by ticket ID |
| PATCH | `/api/grievances/:id/status` | Update status (admin) |
| GET | `/api/admin/grievances` | All grievances (admin) |
| GET | `/api/announcements` | List announcements |

## License
MIT
