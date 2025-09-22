# Cape Town Transit Companion API Documentation

## Overview

This document details the REST API endpoints exposed by the Cape Town Transit Companion application, including request/response formats, authentication requirements, and example usages.

---

## Authentication

- HTTP Basic Authentication is used.
- Provide username and password in the `Authorization` header.
- Endpoints requiring authentication are noted below.

---

## Endpoints

### 1. Journey Planning

#### GET /api/journeys/plan

- Description: Get multimodal journey plans between origin and destination.
- Query Parameters:
  - `origin` (string, required)
  - `destination` (string, required)
  - `modes` (array of strings, optional) - transport modes (BUS, TRAIN, MINIBUS_TAXI)
- Authentication: Not required
- Response: JSON array of `JourneyPlanDTO`

Example:

