# 🏏 Mini Sports Platform

A full-stack sports matches platform where users can view matches, filter by sport, search teams, and save favorites.

![Sports Platform](https://images.unsplash.com/photo-1461896836934- voices-1e130f5e3be?w=800)

## 📋 Features

### Core Features
- ✅ **User Authentication** - Register/Login with JWT (access + refresh tokens)
- ✅ **Match Listing** - View sports matches (Cricket, Football, Tennis)
- ✅ **Filtering** - Filter by sport and match status
- ✅ **Favorites** - Mark/unmark matches as favorites

### Bonus Features
- ✅ **Search** - Search by team name with debounce
- ✅ **Infinite Scroll** - Load more matches as you scroll
- ✅ **Protected Routes** - React Router authentication guards
- ✅ **Docker Setup** - PostgreSQL in Docker container
- ✅ **Unit Tests** - Jest tests for backend utilities

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL (Docker) |
| **ORM** | Prisma |
| **Auth** | JWT (Access + Refresh Tokens), bcrypt |
| **Frontend** | React, Vite, TypeScript |
| **Styling** | Tailwind CSS |
| **State** | TanStack Query, React Context |
| **Testing** | Jest (backend) |

## 📁 Project Structure

```
Assignment/
├── docker-compose.yml      # PostgreSQL container
├── README.md
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Sample data
│   ├── src/
│   │   ├── config/         # App configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth, validation, errors
│   │   ├── routes/         # API routes
│   │   └── utils/          # JWT, response helpers
│   ├── tests/              # Unit tests
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/     # React components
    │   ├── contexts/       # Auth context
    │   ├── pages/          # Login, Register, Matches
    │   ├── services/       # API services
    │   └── types/          # TypeScript types
    └── package.json
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- Docker Desktop
- npm or yarn

### 1. Clone and Navigate
```bash
cd Assignment
```

### 2. Start Database
```bash
docker-compose up -d
```

### 3. Backend Setup
```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

### 4. Frontend Setup (new terminal)
```bash
cd frontend
npm install
npm run dev
```

### 5. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/refresh` | Refresh access token | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/me` | Get current user | Yes |

### Matches
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/matches` | List matches (filter, search, paginate) | Yes |
| GET | `/api/matches/:id` | Get single match | Yes |
| GET | `/api/matches/sports` | Get available sports | Yes |
| GET | `/api/matches/leagues` | Get available leagues | Yes |

### Favorites
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/favorites` | Get user's favorites | Yes |
| GET | `/api/favorites/ids` | Get favorite match IDs | Yes |
| POST | `/api/favorites/:matchId` | Add to favorites | Yes |
| DELETE | `/api/favorites/:matchId` | Remove from favorites | Yes |

### Query Parameters for `/api/matches`
- `sport` - Filter by sport (Cricket, Football, Tennis)
- `status` - Filter by status (UPCOMING, LIVE, COMPLETED)
- `search` - Search by team name
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 50)

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
npm test
```

## 🔑 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/sports_platform?schema=public"
JWT_ACCESS_SECRET=your-access-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📝 Sample Data

The seed script creates 30+ sports matches across:
- **Cricket**: IPL, ICC World Cup, The Ashes, BBL
- **Football**: EPL, La Liga, Serie A, Bundesliga
- **Tennis**: Australian Open, Wimbledon, US Open

Match statuses include UPCOMING, LIVE, and COMPLETED.

## 👤 Author

Built for the Full-Stack Intern Assessment

---

## 📄 License

MIT
