# CapeMove Transit Application - Architecture & Setup Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Development Environment Setup](#development-environment-setup)
5. [Backend Architecture](#backend-architecture)
6. [Frontend Architecture](#frontend-architecture)
7. [Database Design](#database-design)
8. [Security & Authentication](#security--authentication)
9. [API Documentation](#api-documentation)
10. [Deployment Configuration](#deployment-configuration)
11. [Development Workflow](#development-workflow)
12. [Troubleshooting Guide](#troubleshooting-guide)

## Project Overview

CapeMove is a comprehensive transit companion application for Cape Town, South Africa, designed to provide multimodal journey planning and real-time transit information. The system serves as a unified platform that integrates various transport modes including MyCiTi buses, Metrorail trains, and minibus taxis.

### Key Features
- **Multimodal Journey Planning**: Plan trips combining different transport modes
- **Real-time Transit Data**: Live vehicle tracking and arrival predictions
- **Fare Calculator**: Cost estimation across different transport modes
- **Incident Reporting**: Community-driven safety and disruption reporting
- **User Management**: Role-based access with admin, moderator, and user roles
- **PWA Support**: Offline-capable progressive web application

## System Architecture

The application follows a modern microservices-inspired architecture with clear separation of concerns:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React/Vite)  │◄──►│  (Spring Boot)  │◄──►│   (H2/PostgreSQL│
│   Port 5000     │    │   Port 8080     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│  External APIs  │              │
                        │ (Cape Town Open │              │
                        │   Data Portal)  │              │
                        └─────────────────┘              │
                                                         │
                              ┌─────────────────┐        │
                              │    File Storage │◄───────┘
                              │   (Incident     │
                              │    Reports)     │
                              └─────────────────┘
```

## Technology Stack

### Backend Technologies
- **Framework**: Spring Boot 3.0.6
- **Language**: Java 17
- **Database**: H2 (development), PostgreSQL (production)
- **Security**: Spring Security with HTTP Basic Authentication
- **Documentation**: Swagger/OpenAPI 3.0
- **Build Tool**: Maven 3.8+
- **ORM**: Hibernate/JPA
- **Validation**: Hibernate Validator

### Frontend Technologies
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.0
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI (MUI) v5
- **Maps**: React Leaflet with OpenStreetMap
- **PWA**: Vite PWA Plugin with Workbox
- **HTTP Client**: Axios with interceptors
- **Testing**: Jest, React Testing Library

### Development Tools
- **Language Server**: TypeScript Language Server
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier
- **Version Control**: Git

## Development Environment Setup

### Prerequisites
- Java 17 or higher
- Node.js 20+ and npm
- Git for version control

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd cape-move-transit
   ```

2. **Backend Setup**
   ```bash
   cd capeMove_BE
   mvn clean install
   mvn spring-boot:run
   ```

3. **Frontend Setup**
   ```bash
   cd capeMove_FE
   npm install
   npm run dev
   ```

4. **Environment Configuration**
   - Backend: Uses `application.yml` for configuration
   - Frontend: Create `.env.local` from `.env.example`

### Replit-Specific Configuration

The application has been configured specifically for the Replit environment:

- **Vite Configuration**: Allows all hosts and binds to `0.0.0.0:5000`
- **CORS Configuration**: Includes Replit domain in allowed origins
- **Database**: Uses H2 in-memory database for development
- **Environment Variables**: Configured for Replit's proxy system

## Backend Architecture

### Project Structure
```
capeMove_BE/
├── src/main/java/com/capetown/transit/
│   ├── config/           # Configuration classes
│   │   ├── SecurityConfig.java
│   │   ├── SwaggerConfig.java
│   │   └── RestTemplateConfig.java
│   ├── controller/       # REST API controllers
│   │   ├── JourneyPlanningController.java
│   │   ├── RealTimeDataController.java
│   │   ├── FareCalculatorController.java
│   │   ├── IncidentReportingController.java
│   │   ├── UserPreferenceController.java
│   │   └── AdminDashboardController.java
│   ├── service/          # Business logic layer
│   │   ├── JourneyPlanningService.java
│   │   ├── RealTimeDataService.java
│   │   ├── FareCalculatorService.java
│   │   ├── IncidentReportingService.java
│   │   ├── UserPreferenceService.java
│   │   ├── AdminService.java
│   │   └── CustomUserDetailsService.java
│   ├── repository/       # Data access layer
│   │   ├── UserRepository.java
│   │   ├── JourneyPlanRepository.java
│   │   ├── RouteRepository.java
│   │   ├── FareRuleRepository.java
│   │   ├── IncidentReportRepository.java
│   │   └── UserPreferenceRepository.java
│   ├── entity/           # JPA entities
│   │   ├── User.java
│   │   ├── Role.java
│   │   ├── JourneyPlan.java
│   │   ├── Route.java
│   │   ├── FareRule.java
│   │   ├── IncidentReport.java
│   │   └── UserPreference.java
│   ├── dto/              # Data transfer objects
│   │   ├── JourneyPlanDTO.java
│   │   ├── FareCalculationRequestDTO.java
│   │   ├── FareCalculationResponseDTO.java
│   │   ├── IncidentReportDTO.java
│   │   └── UserPreferenceDTO.java
│   ├── exception/        # Exception handling
│   │   ├── GlobalExceptionHandler.java
│   │   └── ResourceNotFoundException.java
│   └── util/             # Utility classes
│       └── MappingConfig.java
└── src/main/resources/
    ├── application.yml   # Application configuration
    └── logback-spring.xml # Logging configuration
```

### Key Components

#### Controllers
- **RESTful APIs**: All controllers follow REST conventions
- **Role-based Access**: Protected endpoints based on user roles
- **Input Validation**: Request validation using Bean Validation
- **Error Handling**: Centralized exception handling

#### Services
- **Business Logic**: Core application logic and external API integration
- **Transaction Management**: Proper transaction boundaries
- **External Integration**: Cape Town Open Data Portal integration

#### Security
- **Authentication**: HTTP Basic Authentication
- **Authorization**: Role-based access control (USER, MODERATOR, ADMIN)
- **CORS**: Configured for cross-origin requests
- **Password Security**: BCrypt encryption with strength 12

## Frontend Architecture

### Project Structure
```
capeMove_FE/
├── public/              # Static assets
│   └── manifest.json    # PWA manifest
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Auth/        # Authentication components
│   │   ├── common/      # Shared components
│   │   ├── Layout/      # Layout components
│   │   └── Map/         # Map-related components
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── JourneyPlanner.tsx
│   │   ├── RealtimeArrivals.tsx
│   │   ├── FareCalculator.tsx
│   │   ├── ReportIncident.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── UserProfile.tsx
│   ├── api/             # API service layer
│   │   ├── services/    # Service classes
│   │   └── axiosInstance.ts # HTTP client configuration
│   ├── store/           # Redux store configuration
│   │   ├── hooks.ts     # Typed Redux hooks
│   │   └── index.ts     # Store setup
│   ├── slices/          # Redux Toolkit slices
│   │   ├── authSlice.ts
│   │   ├── journeysSlice.ts
│   │   ├── realtimeSlice.ts
│   │   ├── faresSlice.ts
│   │   ├── incidentsSlice.ts
│   │   └── uiSlice.ts
│   ├── hooks/           # Custom React hooks
│   │   ├── useGeolocation.ts
│   │   └── useWebSocket.ts
│   ├── routes/          # Routing configuration
│   │   └── AppRoutes.tsx
│   ├── styles/          # Theme and styling
│   │   └── theme.ts
│   ├── utils/           # Utility functions
│   │   ├── formatters.ts
│   │   └── retry.ts
│   └── pwa/             # PWA configuration
│       └── registerServiceWorker.ts
├── index.html           # Entry HTML file
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

### State Management

The application uses Redux Toolkit for state management with the following slices:

- **authSlice**: User authentication state and JWT tokens
- **journeysSlice**: Journey planning and route data
- **realtimeSlice**: Live vehicle tracking and arrivals
- **faresSlice**: Fare calculation results
- **incidentsSlice**: Incident reports and moderation
- **uiSlice**: UI state (loading, notifications, modals)

### Component Architecture

- **Atomic Design**: Components are organized by complexity level
- **Material-UI Integration**: Consistent design system
- **Mobile-First**: Responsive design for mobile devices
- **PWA Support**: Service worker and offline capabilities

## Database Design

### Entity Relationship Diagram

```
┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    User     │    │  UserPreference │    │   JourneyPlan   │
│─────────────│    │─────────────────│    │─────────────────│
│ id (PK)     │◄──►│ id (PK)         │    │ id (PK)         │
│ username    │    │ user_id (FK)    │    │ user_id (FK)    │
│ email       │    │ modes[]         │    │ origin          │
│ password    │    │ notifications   │    │ destination     │
│ roles[]     │    │ created_at      │    │ modes[]         │
│ enabled     │    │ updated_at      │    │ planned_at      │
│ created_at  │    └─────────────────┘    └─────────────────┘
│ updated_at  │              │                      │
└─────────────┘              │                      │
       │                     │                      │
       │                     │              ┌─────────────────┐
       │                     │              │ IncidentReport  │
       │                     │              │─────────────────│
       │                     │              │ id (PK)         │
       │                     │              │ user_id (FK)    │
       │                     │              │ type            │
       │                     │              │ description     │
       │                     │              │ latitude        │
       │                     │              │ longitude       │
       │                     │              │ status          │
       │                     │              │ moderated_by    │
       │                     │              │ created_at      │
       │                     │              │ moderated_at    │
       │                     │              └─────────────────┘
       │                     │                      │
       │              ┌─────────────────┐           │
       │              │     Route       │           │
       │              │─────────────────│           │
       │              │ id (PK)         │           │
       │              │ route_number    │           │
       │              │ mode            │           │
       │              │ stops[]         │           │
       │              │ active          │           │
       │              └─────────────────┘           │
       │                      │                    │
       │              ┌─────────────────┐           │
       │              │    FareRule     │           │
       │              │─────────────────│           │
       │              │ id (PK)         │           │
       │              │ mode            │           │
       │              │ base_fare       │           │
       │              │ per_km_rate     │           │
       │              │ zone_based      │           │
       │              │ zones[]         │           │
       │              │ active          │           │
       │              └─────────────────┘           │
       └─────────────────────────────────────────────┘
```

### Key Tables

#### Users Table
- Stores user authentication and profile information
- Supports multiple roles per user (USER, MODERATOR, ADMIN)
- Includes audit fields (created_at, updated_at)

#### Journey Plans Table
- Stores user journey planning requests
- Supports multimodal transport preferences
- Links to user for personalized journey history

#### Incident Reports Table
- Community-reported incidents and hazards
- Includes geolocation data for mapping
- Moderation workflow with status tracking

#### Routes Table
- Transit route information for all modes
- Dynamic stop listings
- Active/inactive status for service changes

#### Fare Rules Table
- Configurable fare calculation rules
- Support for distance-based and zone-based pricing
- Mode-specific pricing structures

## Security & Authentication

### Authentication Flow
1. **User Login**: HTTP Basic Authentication with username/password
2. **Session Management**: Server-side session management
3. **Role Assignment**: Users assigned roles during registration
4. **Authorization**: Method-level security using Spring Security annotations

### Security Configuration
- **Password Encryption**: BCrypt with strength 12
- **CORS**: Configured for frontend domain access
- **CSRF**: Disabled for API endpoints (stateless authentication)
- **Method Security**: Role-based access to service methods

### API Security
- **Public Endpoints**: Journey planning, real-time data (read-only)
- **Authenticated Endpoints**: Incident reporting, user preferences
- **Admin Endpoints**: User management, content moderation

## API Documentation

### Base URL
- Development: `http://localhost:8080`
- Production: `https://your-domain.com`

### Authentication
All protected endpoints require HTTP Basic Authentication:
```
Authorization: Basic base64(username:password)
```

### Core Endpoints

#### Journey Planning
```
GET /api/journeys/plan
POST /api/journeys/plan
```

#### Real-time Data
```
GET /api/realtime/vehicles
GET /api/realtime/arrivals
```

#### Fare Calculator
```
POST /api/fares/estimate
```

#### Incident Reporting
```
POST /api/incidents/report     # Authenticated
GET /api/incidents             # Authenticated
PUT /api/incidents/{id}/status # Admin only
```

#### User Management
```
GET /api/user/profile          # Authenticated
PUT /api/user/preferences      # Authenticated
```

#### Admin Endpoints
```
GET /api/admin/users           # Admin only
GET /api/admin/incidents       # Admin/Moderator
PUT /api/admin/users/{id}/role # Admin only
```

### Swagger Documentation
- Available at: `/swagger-ui.html`
- API docs: `/v3/api-docs`

## Deployment Configuration

### Production Deployment
The application is configured for deployment using Replit's autoscale deployment target:

```yaml
deployment_target: autoscale
build: 
  - npm install --prefix capeMove_FE
  - npm run build --prefix capeMove_FE
run:
  - cd capeMove_BE && mvn spring-boot:run &
  - cd capeMove_FE && npm run preview -- --host=0.0.0.0 --port=5000
```

### Environment Configuration

#### Backend Environment
- `DB_HOST`: Database host (default: localhost)
- `DB_PORT`: Database port (default: 5432)
- `DB_NAME`: Database name (default: transitdb)
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `EXTERNAL_API_KEY`: Cape Town Open Data Portal API key

#### Frontend Environment
- `VITE_API_BASE_URL`: Backend API URL
- `VITE_WS_BASE_URL`: WebSocket URL for real-time features
- `VITE_APP_NAME`: Application name

### Database Migration
For production deployment:
1. Switch from H2 to PostgreSQL in `application.yml`
2. Update connection settings
3. Run database migrations (if using migration tools)

## Development Workflow

### Local Development
1. **Start Backend**: `cd capeMove_BE && mvn spring-boot:run`
2. **Start Frontend**: `cd capeMove_FE && npm run dev`
3. **Access Application**: http://localhost:5000
4. **API Documentation**: http://localhost:8080/swagger-ui.html
5. **Database Console**: http://localhost:8080/h2-console

### Code Quality
- **Backend**: Maven enforces code quality and compilation
- **Frontend**: ESLint and TypeScript ensure code quality
- **Testing**: Unit tests for critical business logic

### Git Workflow
1. Feature branches for new development
2. Pull requests for code review
3. Main branch protected with required reviews

## Troubleshooting Guide

### Common Issues

#### Frontend Build Errors
- **Missing Pages**: Ensure all page components exist in `src/pages/`
- **Import Errors**: Check file paths and component exports
- **TypeScript Errors**: Run `npm run typecheck` to identify issues

#### Backend Startup Issues
- **Port Conflicts**: Ensure port 8080 is available
- **Database Connection**: Check H2 console accessibility
- **Maven Dependencies**: Run `mvn clean install` to resolve dependencies

#### CORS Issues
- **Cross-Origin Errors**: Verify CORS configuration includes frontend URL
- **Preflight Failures**: Check OPTIONS request handling

#### Authentication Problems
- **Login Failures**: Verify user exists in database
- **Authorization Errors**: Check user roles and endpoint permissions

### Performance Optimization
- **Frontend**: Enable code splitting and lazy loading
- **Backend**: Database connection pooling and query optimization
- **Caching**: Implement Redis for session storage in production

### Monitoring and Logging
- **Backend Logs**: Available via Spring Boot Actuator
- **Frontend Errors**: Browser console and error boundaries
- **API Monitoring**: Swagger UI for endpoint testing

---

## Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [Cape Town Open Data Portal](https://web1.capetown.gov.za/web1/OpenDataPortal/)

This documentation serves as a comprehensive guide for understanding, developing, and maintaining the CapeMove transit application. For specific implementation details, refer to the inline code comments and additional documentation files in each module.