# Cape Town Transit Companion

A unified Spring Boot application providing multimodal transit planning, real-time data integration, fare calculation, crowdsourced incident reporting, and comprehensive REST API endpoints for Cape Town's transit systems including MyCiTi bus, Metrorail train, and minibus taxis.

---

## Features

- **Multimodal Transit Planning**
  - Integrates MyCiTi bus, Metrorail trains, and minibus taxi routes
  - Combines different transport modes for optimal journey plans

- **Real-time Transit Data**
  - Integrates Cape Town Open Data Portal APIs
  - Provides vehicle tracking, arrival predictions, and disruption notifications

- **Fare Calculator**
  - Configurable fare rules with distance and zone-based pricing
  - Supports multi-modal journey fare optimization

- **Crowdsourced Reporting**
  - Allows users to submit hazard and incident reports
  - Includes moderation and validation by moderators and admins

- **User Preferences**
  - Manage preferred transport modes and notification settings

- **Authentication & Authorization**
  - Basic HTTP authentication
  - Role-based access control (USER, MODERATOR, ADMIN)
  - Admin dashboard and moderator panel for management

- **API Documentation**
  - Swagger UI available for interactive API exploration

---

## Prerequisites

- Java 17 or higher
- Maven 3.8+
- PostgreSQL 12+
- (Optional) Docker and Docker Compose for containerized deployment

---

## Setup Instructions

1. **Clone the repository**

