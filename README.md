# NeoTrade

[![Repo](https://img.shields.io/badge/GitHub-NeoTrade-181717?logo=github)](https://github.com/Manshi1207P/NeoTrade)
[![Live](https://img.shields.io/badge/Live-neotrade--frontend-success?logo=render)](https://neotrade-frontend.onrender.com)

**Live:** [https://neotrade-frontend.onrender.com](https://neotrade-frontend.onrender.com)

NeoTrade is a full-stack stock trading platform built on the MERN stack. It pairs a public-facing marketing/landing site with a separate, authenticated trading dashboard, backed by a JWT-secured Express + MongoDB API.

## Overview

The project is split into three independent apps that work together:

| App | Purpose |
|---|---|
| **`frontend/`** | Public landing site — home, about, products, pricing, support, and the login/signup flow |
| **`dashboard/`** | Authenticated trading dashboard — holdings, positions, orders, watchlist, and buy/sell actions |
| **`backend/`** | REST API — handles authentication and serves holdings, positions, and order data from MongoDB |

Users sign up or log in on the **frontend**, receive a JWT, and are then routed to the **dashboard**, where the token is sent with every API request to access protected trading data.

## Features

- **Authentication** — signup/login with bcrypt-hashed passwords and JWT-based sessions (7-day expiry)
- **Protected routes** — both the dashboard UI and backend endpoints require a valid token
- **Portfolio tracking** — view holdings and open positions with gain/loss indicators
- **Order placement** — buy/sell stocks through a dedicated order window, with orders persisted to MongoDB
- **Data visualization** — doughnut and vertical charts (via Chart.js) summarizing portfolio performance
- **Responsive landing site** — home, about, product, pricing, and support pages with a contact/ticket form

## Screenshots

### Landing Site

| Signup | Login |
|---|---|
| ![Signup page](https://raw.githubusercontent.com/Manshi1207P/NeoTrade/main/Images/SignupPage.png) | ![Login page](https://raw.githubusercontent.com/Manshi1207P/NeoTrade/main/Images/LoginPage.png) |

![Footer](https://raw.githubusercontent.com/Manshi1207P/NeoTrade/main/Images/Frontend.png)

### Trading Dashboard

| Dashboard | Orders |
|---|---|
| ![Dashboard home](https://raw.githubusercontent.com/Manshi1207P/NeoTrade/main/Images/Dashboard1.png) | ![Orders page](https://raw.githubusercontent.com/Manshi1207P/NeoTrade/main/Images/Dashboard2.png) |

![Holdings page](https://raw.githubusercontent.com/Manshi1207P/NeoTrade/main/Images/Dashboard3.png)

## Pages & Navigation

**Landing site (`frontend`)**
Signup · Login · About · Product · Pricing · Support

Footer links — Company: About, Products, Pricing, Referral programme, Careers, Neotrade.tech, Press & media, Neotrade cares (CSR). Support: Contact, Support portal, N-Connect blog, List of charges, Downloads & resources. Account: Open an account, Fund transfer, 60 day challenge.

**Trading dashboard (`dashboard`)**
Dashboard · Orders · Holdings · Positions · Funds · Apps

The dashboard layout includes a live NIFTY 50 / SENSEX ticker bar, a searchable watchlist on the left, and a main panel that switches between the equity summary, order book, holdings table (with P&L and a stock price chart), and positions view.

## Disclaimer

The footer of the landing page carries the standard broking-platform disclosures used as placeholder/demo content for this project:

- Neotrade Broking Ltd. is presented as a member of NSE & BSE, with CDSL depository services through Neotrade Securities Pvt. Ltd. and commodity trading through Neotrade Commodities Pvt. Ltd. (MCX), along with a registered address in Bengaluru, Karnataka.
- Complaint-handling contacts (`complaints@Neotrade.com`, `dp@Neotrade.com`) and a note to read the Risk Disclosure Document as prescribed by SEBI.
- Guidance on filing complaints via the SEBI SCORES portal.
- A market-risk warning and SEBI-style investor-protection notices, including KYC, unauthorized-transaction prevention, and IPO subscription guidance.

This content is illustrative only — **NeoTrade is a student/portfolio project and is not a registered broking entity.**

## Tech Stack

- **Frontend & Dashboard:** React, React Router, Axios, Material UI (dashboard), Chart.js / react-chartjs-2
- **Backend:** Node.js, Express, Mongoose (MongoDB), JWT, bcryptjs, CORS, dotenv
- **Database:** MongoDB

## Project Structure

```
NeoTrade/
├── backend/
│   ├── index.js              # Express app & API routes
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification (requireAuth)
│   ├── model/                # Mongoose models (User, Holdings, Positions, Orders)
│   └── schemas/              # Mongoose schemas
├── frontend/
│   └── src/
│       └── landing_page/     # Home, About, Products, Pricing, Support, Login, Signup
└── dashboard/
    └── src/
        ├── components/       # Dashboard UI (Holdings, Positions, Orders, WatchList, etc.)
        └── utils/api.js       # Axios instance with JWT interceptor
```

## Getting Started

### Prerequisites
- Node.js and npm
- A MongoDB connection string (local or Atlas)

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
PORT=3002
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm start
```

### 2. Frontend (landing site)

```bash
cd frontend
npm install
npm start
```

### 3. Dashboard

```bash
cd dashboard
npm install
npm start
```

> **Note:** The dashboard and frontend currently point to deployed Render URLs for API calls and cross-app redirects (e.g. `dashboard/src/utils/api.js`, `dashboard/src/components/RequireAuth.js`). Update these to `http://localhost:3002` and your local frontend URL respectively when running everything locally.

## API Endpoints

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | No | Create a new account |
| POST | `/api/auth/login` | No | Log in and receive a JWT |
| GET | `/api/auth/me` | Yes | Get the logged-in user's info |
| GET | `/allHoldings` | Yes | Fetch all holdings |
| GET | `/allPositions` | Yes | Fetch all positions |
| POST | `/newOrder` | Yes | Place a new buy/sell order |

Protected routes expect an `Authorization: Bearer <token>` header.

## License

This project does not currently specify a license.
