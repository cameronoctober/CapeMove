# Cape Town Transit Companion - Database Schema Documentation

## Overview

This document describes the database schema used by the Cape Town Transit Companion application. The schema supports users, roles, journey plans, routes, fare rules, incident reports, and user preferences.

---

## Tables and Relationships

### 1. users

| Column     | Type   | Constraints                      | Description                     |
|------------|--------|---------------------------------|---------------------------------|
| id         | UUID   | Primary Key, Not Null, Unique   | User identifier                |
| username   | String | Unique, Not Null                | Login username                 |
| password   | String | Not Null                       | Hashed password                |
| email      | String | Unique, Not Null                | User email                    |
| enabled    | Boolean| Not Null                       | Account active status         |
| created_at | Instant| Not Null                       | Creation timestamp            |
| updated_at | Instant|                               | Last update timestamp         |

### 2. user_roles

| Column  | Type   | Constraints                    | Description           |
|---------|--------|-------------------------------|-----------------------|
| user_id | UUID   | Foreign Key to users(id)       | User reference        |
| role    | String | Not Null                      | Role name (USER, ADMIN, MODERATOR) |

### 3. journey_plans

| Column     | Type   | Constraints                     | Description                    |
|------------|--------|--------------------------------|--------------------------------|
| id         | UUID   | Primary Key, Not Null           | Journey plan identifier       |
| origin     | String | Not Null                      | Starting location             |
| destination| String | Not Null                      | Destination location          |
| planned_at | Instant| Not Null                      | Timestamp when planned        |
| user_id    | UUID   | Foreign Key to users(id)       | User who planned journey      |

### 4. journey_modes

| Column          | Type   | Constraints                   | Description                   |
|-----------------|--------|------------------------------|-------------------------------|
| journey_plan_id  | UUID   | Foreign Key to journey_plans(id) | Journey plan reference     |
| mode            | String | Not Null                    | Transport mode (BUS, TRAIN, etc.) |

### 5. routes

| Column      | Type   | Constraints                 | Description                   |
|-------------|--------|-----------------------------|-------------------------------|
| id          | UUID   | Primary Key, Not Null        | Route identifier             |
| mode        | String | Not Null                   | Transport mode               |
| route_number| String | Not Null                   | Route number or code         |
| active      | Boolean| Not Null                   | Route active status          |

### 6. route_stops

| Column | Type   | Constraints                 | Description                   |
|--------|--------|-----------------------------|-------------------------------|
| route_id| UUID  | Foreign Key to routes(id)    | Route reference              |
| stop   | String | Not Null                   | Stop name or code            |

### 7. fare_rules

| Column      | Type    | Constraints                 | Description                   |
|-------------|---------|-----------------------------|-------------------------------|
| id          | UUID    | Primary Key, Not Null        | Fare rule identifier         |
| mode        | String  | Not Null                   | Transport mode               |
| base_fare   | Decimal | Not Null                   | Base fare amount             |
| per_km_rate | Decimal | Not Null                   | Rate per km                 |
| zone_based  | Boolean | Not Null                   | If fare is zone-based        |
| active      | Boolean | Not Null                   | Fare rule active status      |

### 8. fare_rule_zones

| Column      | Type   | Constraints                 | Description                   |
|-------------|--------|-----------------------------|-------------------------------|
| fare_rule_id| UUID   | Foreign Key to fare_rules(id)| Fare rule reference          |
| zone        | String |                             | Zone covered by the rule     |

### 9. incident_reports

| Column       | Type    | Constraints                 | Description                   |
|--------------|---------|-----------------------------|-------------------------------|
| id           | UUID    | Primary Key, Not Null        | Incident report identifier   |
| user_id      | UUID    | Foreign Key to users(id)     | Reporting user               |
| latitude     | Decimal | Not Null                   | Latitude coordinate          |
| longitude    | Decimal | Not Null                   | Longitude coordinate         |
| description  | Text    | Not Null                   | Description of incident      |
| type         | String  | Not Null                   | Incident type (ACCIDENT, DELAY, etc.) |
| status       | String  | Not Null                   | Report status (PENDING, APPROVED, REJECTED) |
| created_at   | Instant | Not Null                   | Timestamp of report creation |
| moderated_by | UUID    | Foreign Key to users(id)    | Moderator user               |
| moderated_at | Instant |                            | Timestamp of moderation     |

### 10. user_preferences

| Column               | Type    | Constraints                 | Description                   |
|----------------------|---------|-----------------------------|-------------------------------|
| id                   | UUID    | Primary Key, Not Null        | Preference identifier        |
| user_id              | UUID    | Foreign Key to users(id), Unique | User reference          |
| notify_on_incidents  | Boolean | Not Null                   | Notification setting          |
| notify_on_disruptions| Boolean | Not Null                   | Notification setting          |
| created_at           | Instant | Not Null                   | Creation timestamp            |
| updated_at           | Instant |                            | Last update timestamp         |

### 11. user_preferred_modes

| Column         | Type   | Constraints                 | Description                   |
|----------------|--------|-----------------------------|-------------------------------|
| preference_id  | UUID   | Foreign Key to user_preferences(id) | Preference reference    |
| mode           | String |                             | Preferred transport mode     |

---

## ER Diagram

![ER Diagram](https://user-images.githubusercontent.com/placeholder/er-diagram.png)

*(Diagram URL is a placeholder; include actual ER diagram image URL or embed here)*

---

## Indexes and Constraints

- Unique indexes on `users.username` and `users.email`.
- Foreign key constraints enforce referential integrity.
- Non-null constraints on critical fields.
- Enum constraints enforced via application validation.

---

## Notes

- Use UUID as primary keys for scalability and uniqueness.
- Soft deletes not implemented; can be added if required.
- Zones are stored as string lists in fare rules for flexible zone management.
- Incident reports support moderation by linking to moderators.

---
