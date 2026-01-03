# 🏏 SportZone - Mini Sports Platform

A full-stack sports matches platform where users can view matches, filter by sport, search teams, and save favorites.

## 🌐 Live Demo

| Platform | URL |
|----------|-----|
| **Frontend** | [https://sport-zone-dun.vercel.app](https://sport-zone-dun.vercel.app) |
| **Backend API** | [https://sportzone-9vh6.onrender.com](https://sportzone-9vh6.onrender.com) |

> **Note:** First load may take 30-60 seconds as Render free tier spins up after inactivity.

---

## 📋 Features

### Core Features
- ✅ **User Authentication** - Register/Login with JWT (access + refresh tokens)
- ✅ **Match Listing** - View sports matches (Cricket, Football, Tennis)
- ✅ **Filtering** - Filter by sport and match status (Upcoming, Live, Completed)
- ✅ **Favorites** - Mark/unmark matches as favorites with one click

### Bonus Features
- ✅ **Search** - Search by team name or league with debounce
- ✅ **Pagination** - Load more matches with "Load More" button
- ✅ **Protected Routes** - React Router authentication guards
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Docker Setup** - PostgreSQL in Docker container for local development
- ✅ **Unit Tests** - Jest tests for backend utilities

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL (Supabase in production) |
| **ORM** | Prisma |
| **Auth** | JWT (Access + Refresh Tokens), bcrypt |
| **Frontend** | React 18, Vite, TypeScript |
| **Styling** | Tailwind CSS |
| **State Management** | TanStack Query, React Context |
| **Deployment** | Vercel (Frontend), Render (Backend), Supabase (Database) |

---

## 📁 Project Structure

```
SportZone/
├── docker-compose.yml        # PostgreSQL container for local dev
├── README.md
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.ts           # Sample data (30 matches)
│   ├── src/
│   │   ├── config/           # Environment configuration
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/       # Auth, validation, error handling
│   │   ├── routes/           # API route definitions
│   │   └── utils/            # JWT, response helpers
│   ├── tests/                # Unit tests
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/       # Reusable React components
    │   ├── contexts/         # Auth context provider
    │   ├── pages/            # Login, Register, Matches pages
    │   ├── services/         # API service layer (Axios)
    │   └── types/            # TypeScript interfaces
    └── package.json
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+
- Docker Desktop (for PostgreSQL)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/gaurav1Nn/SportZone.git
cd SportZone
```

### 2. Start PostgreSQL Database
```bash
docker-compose up -d
```

### 3. Backend Setup
```bash
cd backend
npm install
cp .env.example .env        # Copy environment file
npx prisma migrate dev      # Run database migrations
npm run seed                # Seed sample data
npm run dev                 # Start backend server
```

### 4. Frontend Setup (new terminal)
```bash
cd frontend
npm install
npm run dev                 # Start frontend dev server
```

### 5. Access the Application
| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/health |

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/refresh` | Refresh access token | ❌ |
| POST | `/api/auth/logout` | Logout user | ✅ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Matches
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/matches` | List matches (filter, search, paginate) | ✅ |
| GET | `/api/matches/:id` | Get single match | ✅ |
| GET | `/api/matches/sports` | Get available sports | ✅ |
| GET | `/api/matches/leagues` | Get available leagues | ✅ |

### Favorites
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/favorites` | Get user's favorites | ✅ |
| GET | `/api/favorites/ids` | Get favorite match IDs | ✅ |
| POST | `/api/favorites/:matchId` | Add to favorites | ✅ |
| DELETE | `/api/favorites/:matchId` | Remove from favorites | ✅ |

### Query Parameters for `/api/matches`
| Parameter | Description | Example |
|-----------|-------------|---------|
| `sport` | Filter by sport | `Cricket`, `Football`, `Tennis` |
| `status` | Filter by status | `UPCOMING`, `LIVE`, `COMPLETED` |
| `search` | Search by team/league | `Mumbai`, `IPL` |
| `page` | Page number | `1` (default) |
| `limit` | Items per page | `15` (default, max: 50) |

---

## 🧪 Running Tests

```bash
cd backend
npm test
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/sports_platform"
JWT_ACCESS_SECRET=your-access-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000
```

---

## 📝 Sample Data

The seed script creates **30 sports matches** across:
- **Cricket**: IPL, ICC World Cup, The Ashes, BBL
- **Football**: EPL, La Liga, Serie A, Bundesliga, Champions League
- **Tennis**: Australian Open, Wimbledon, US Open, French Open

Match statuses include `UPCOMING`, `LIVE`, and `COMPLETED`.

---

## 🖥️ Screenshots

### Login Page
Clean, minimal login interface with form validation.

### Matches Page
- Sport-specific card colors (green for Cricket, blue for Football, yellow for Tennis)
- Filter by sport and status
- Search functionality
- Favorite toggle with heart icon
- Load More pagination

---

## 👤 Author

**Gaurav**  
Built for the Full-Stack Intern Assessment

---

## 📄 License

MIT
