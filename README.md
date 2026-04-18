Community-Innoverse_front1/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ui/        # Reusable UI components (shadcn/ui)
│   │   │   └── ...        # Feature-specific components
│   │   ├── pages/         # Page components (routes)
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
│   ├── public/            # Static assets
│   └── index.html         # HTML entry point
│
├── server/                # Backend Express server
│   ├── src/
│   │   ├── config/       # Configuration files (Vite, static serving)
│   │   ├── middleware/   # Express middleware (logging, etc.)
│   │   ├── routes/       # API route definitions
│   │   └── services/     # Business logic and data access
│   ├── data/             # JSON data files (optional file-based storage)
│   ├── tests/            # Test files
│   └── index.ts          # Server entry point
│
├── shared/               # Shared code between client and server
│   └── schema.ts        # Zod schemas and Drizzle ORM schemas
│
├── script/              # Build and utility scripts
│   └── build.ts        # Production build script
│
├── attached_assets/     # Project requirements and documentation (optional)
│
├── package.json         # Root package.json (monorepo dependencies)
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── drizzle.config.ts    # Drizzle ORM configuration
Technology Stack
Frontend
React 19 - UI framework
TypeScript - Type safety
Vite - Build tool and dev server
Wouter - Lightweight routing
TanStack Query - Data fetching and caching
Zustand - State management
shadcn/ui - UI component library
Tailwind CSS - Styling
Backend
Express - Web framework
TypeScript - Type safety
Drizzle ORM - Database ORM (PostgreSQL ready)
Zod - Schema validation
Shared
Zod - Runtime type validation
Drizzle ORM - Database schema definitions
Getting Started
Prerequisites
Node.js 18+
npm or yarn
Installation
# Install dependencies
npm install
Development
# Start development server (runs both frontend and backend)
npm run dev

# Frontend only (on port 5000)
npm run dev:client

# Backend only
npm run dev
The application will be available at http://localhost:5000

Building for Production
# Build the application
npm run build

# Start production server
npm start
Directory Details
/client
Frontend React application with component-based architecture. Uses modern React patterns with hooks and functional components.

/server
Backend Express server organized by concerns:

Entry point

index.ts – Creates the Express app and HTTP server, wires up middleware, registers routes, and integrates Vite in development.
src/config/ – Server configuration

static.ts – Serves the built frontend from dist/public in production (acts as the SPA fallback).
vite.ts – Sets up the Vite dev server in middleware mode so the backend and frontend run together in development.
src/middleware/ – Cross-cutting Express middleware

logger.ts – Request logging utilities and a middleware that logs /api/* requests with status and duration.
src/routes/ – API endpoint definitions

index.ts – Registers all API routes (currently patients + health check) on the Express app.
src/services/ – Business logic and data access layer

storage.ts – In-memory implementation of the IStorage interface for users and patients. This is the main place to swap in a real database (e.g. PostgreSQL) using Drizzle.
data/ – JSON data files (optional file-based storage, not used by the current in-memory storage but useful for seeding/demo).

tests/ – Placeholder for backend tests (e.g. API route tests using Vitest/supertest).

utils/ – Placeholder for shared backend utilities/helpers.

/shared
Code shared between frontend and backend, primarily:

Database schemas (Drizzle ORM)
Validation schemas (Zod)
/script
Build and deployment scripts.

API Endpoints
All API routes are prefixed with /api:

GET /api/health - Health check
GET /api/patients - List all patients
POST /api/patients - Create a new patient
GET /api/patients/:id - Get patient by ID
PUT /api/patients/:id - Update patient
DELETE /api/patients/:id - Delete patient
Development Guidelines
Adding New Features
Frontend: Add components in client/src/components/ and pages in client/src/pages/
Backend: Add routes in server/src/routes/index.ts and services in server/src/services/
Shared Schemas: Add validation schemas in shared/schema.ts
Code Organization
Keep components small and focused
Use TypeScript for type safety
Follow the existing directory structure
Add comments for complex logic
Notes
The server currently uses in-memory storage (data is lost on restart)
For production, migrate to a database (PostgreSQL is configured via Drizzle)
All routes use Zod schemas for validation
The project uses a monorepo structure with shared dependencies
