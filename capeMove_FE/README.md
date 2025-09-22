# CapeMove (Frontend)

Overview
- React + TypeScript frontend for CapeMove — a mobile-first transit companion for Cape Town.
- Features: routing, journey planning, realtime vehicle tracking, fare estimates, incident reporting.
- PWA-enabled and designed for offline graceful degradation.

Quick architecture
- React 18 + Vite
- Redux Toolkit for state management
- Axios centralized client with JWT refresh handling
- react-leaflet for maps
- vite-plugin-pwa for PWA support
- TypeScript + Jest + React Testing Library

Prerequisites
- Node.js 18+ and npm (or yarn/pnpm)
- Backend API running (provide VITE_API_BASE_URL)
- Optional: WebSocket server for realtime (VITE_WS_BASE_URL)

Getting started (local)
1. Clone the repo:
   git clone <repo-url>
   cd cape-move-frontend

2. Copy environment example:
   cp env.example .env.local

3. Install dependencies:
   npm install

4. Run dev server:
   npm run dev
   Open http://localhost:3000

Build and preview
- Build production bundle:
  npm run build

- Preview production build:
  npm run preview

Testing
- Run unit tests:
  npm run test

- Type check:
  npm run typecheck

Lint & format
- Lint:
  npm run lint

- Format:
  npm run format

PWA & Offline
- The app registers a service worker (vite-plugin-pwa). To test offline:
  1. Run npm run build and npm run preview
  2. Open devtools -> Application -> Service Workers -> check "Offline"
  3. Reload to inspect offline fallbacks (offline.html is used for navigation fallback)

Environment
- VITE_API_BASE_URL: backend REST base (e.g. http://localhost:8080)
- VITE_WS_BASE_URL: WebSocket base (e.g. ws://localhost:8080)

Auth notes
- The app uses an access token (JWT) stored in Redux memory and expects the backend to set a httpOnly refresh cookie at /api/auth/login.
- The axios client will call /api/auth/refresh (with credentials) to get a new access token when needed.
- If your backend returns a refreshToken in response body, adapt security to avoid storing long-lived secrets in localStorage.

API surface (frontend -> backend mapping)
- POST /api/auth/login
  Request: { email, password }
  Response: { accessToken, refreshToken?, user: { id, email, name, role } }
- POST /api/auth/refresh
  Request: (cookie-based or body)
  Response: { accessToken }
- GET /api/user/profile
  Response: { id, email, name, role, phone, preferences }
- POST /api/journeys/plan
  Request: { origin:{lat,lon}, destination:{lat,lon}, preferences:{mode,maxTransfers} }
  Response: JourneyPlan
- GET /api/realtime/vehicles?bbox=...
  Response: Array<Vehicle>
- POST /api/fares/estimate
  Request: { origin, destination, passengers, concessions }
  Response: FareEstimate
- POST /api/incidents
  Multipart form: description, location, photos[]
  Response: Report

Deployment notes
- Build artifacts are in /dist.
- Example Docker multi-stage build and nginx config are included (Dockerfile, nginx.conf).
- Ensure the backend is accessible from the deployed container and update proxy/back-end URLs accordingly.

Security best-practices
- Prefer httpOnly refresh cookies for refresh flow.
- Avoid storing refresh tokens in localStorage if possible.
- See security/README-Tokens.md for flow diagrams and recommended server behavior.

Contributing
- Follow the code style: Prettier + ESLint.
- Add tests for new features.
- Open PRs to develop branch.

License
- MIT

Contact
- Project maintainers and API contract owners should supply backend endpoints and token flow expectations.
