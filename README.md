# 🚀 Expanders360 Backend (NestJS)

A production-ready backend service for **Expanders360**, built with [NestJS](https://nestjs.com/).  
It provides authentication, project/vendor matching, analytics, document storage, and notifications.  
Fully containerized for local development with **Docker Compose**.

---

## ✨ Features

- 🔑 **Authentication & RBAC**
  - JWT-based login for clients & admins
  - Role-based access control (RBAC)

- 🗄 **Databases**
  - **MySQL (TypeORM)** → clients, projects, vendors, matches
  - **MongoDB (Mongoose)** → research documents

- 📂 **File Handling**
  - Cloudinary integration for document uploads

- ⚡ **Matching Engine**
  - Rebuild matches per project `/projects/:id/matches/rebuild`

- 📊 **Analytics**
  - Cross-DB analytics endpoint `/analytics/top-vendors`

- 📬 **Notifications**
  - Email alerts for new matches (MailHog by default)

- ⏰ **Scheduling**
  - Daily refresh & SLA flagging with `@nestjs/schedule`

- 🐳 **Dockerized Development**
  - Local MySQL, MongoDB, MailHog ready-to-run

---

## 🚀 Quick Start (Local Dev)

```bash
# 1. Copy env file
cp .env.example .env

# 2. Start services (MySQL, MongoDB, MailHog)
docker-compose up -d

# 3. Install deps
npm install

# 4. Run migrations & seed
npm run migration:run
npm run seed

# 5. Start API in watch mode
npm run start:dev
📧 MailHog UI: http://localhost:8025
📦 MySQL runs inside Docker (default localhost:3307)
📦 MongoDB runs inside Docker (localhost:27017)

🌍 API Reference
Below is a detailed overview of available endpoints, their purpose, request/response formats, and usage examples.

🔑 Authentication
POST /auth/login
Login with email and password. Returns a JWT token.

Request:

json
Copy
Edit
{
  "email": "admin@example.com",
  "password": "password123"
}
Response:

json
Copy
Edit
{
  "access_token": "eyJhbGciOiJIUzI1NiIs..."
}
Use this token in all subsequent requests:

makefile
Copy
Edit
Authorization: Bearer <access_token>
👥 Clients & Projects
GET /projects
Fetch all projects for the currently logged-in client.

Headers:

makefile
Copy
Edit
Authorization: Bearer <token>
Response:

json
Copy
Edit
[
  {
    "id": 1,
    "name": "New Market Expansion",
    "clientId": 2,
    "createdAt": "2025-08-20T12:00:00.000Z"
  }
]
POST /projects
Create a new project.

Request:

json
Copy
Edit
{
  "name": "AI Market Research",
  "description": "Exploring AI vendor landscape",
  "clientId": 2
}
Response:

json
Copy
Edit
{
  "id": 5,
  "name": "AI Market Research",
  "description": "Exploring AI vendor landscape",
  "clientId": 2
}
POST /projects/:id/matches/rebuild
Rebuild vendor matches for a project. Useful when vendor data changes.

Request Example:

bash
Copy
Edit
POST /projects/5/matches/rebuild
Response:

json
Copy
Edit
{
  "projectId": 5,
  "matches": [
    { "vendorId": 10, "score": 17 },
    { "vendorId": 11, "score": 15 }
  ]
}
📊 Analytics
GET /analytics/top-vendors
Shows the top 3 vendors per country (last 30 days), with average scores and linked research docs.

Response:

json
Copy
Edit
[
  {
    "country": "US",
    "topVendors": [
      { "vendor_id": 10, "avg_score": 18.5 },
      { "vendor_id": 12, "avg_score": 17.2 },
      { "vendor_id": 11, "avg_score": 16.9 }
    ],
    "researchDocCount": 5
  },
  {
    "country": "DE",
    "topVendors": [
      { "vendor_id": 15, "avg_score": 19.1 }
    ],
    "researchDocCount": 2
  }
]
📂 Documents
POST /documents/upload
Upload a research document (PDF, Word, etc.). File is stored in Cloudinary.

Form-data Example:

vbnet
Copy
Edit
file: <upload-file.pdf>
title: "Market Report 2025"
projectId: 5
tags: ["AI", "Research"]
Response:

json
Copy
Edit
{
  "id": "64fb2d9b8e0a5e7f5d9c",
  "title": "Market Report 2025",
  "fileUrl": "https://res.cloudinary.com/.../report.pdf",
  "tags": ["AI", "Research"]
}
GET /documents/search
Search documents by tag, text, or project.

Query Example:

bash
Copy
Edit
/documents/search?tag=AI&q=report&projectId=5
Response:

json
Copy
Edit
[
  {
    "id": "64fb2d9b8e0a5e7f5d9c",
    "title": "Market Report 2025",
    "content": "This report explores AI...",
    "tags": ["AI", "Research"],
    "fileUrl": "https://res.cloudinary.com/.../report.pdf"
  }
]
🧮 Matching Formula
text
Copy
Edit
score = (services_overlap * 2) + rating + SLA_weight
SLA_weight = max(0, 10 - (response_sla_hours / 12))
Vendors matched by service overlap, rating, and SLA

Stored with idempotent upsert

🌱 Seed Data
When seeding, the system auto-creates:

Admin user (admin@example.com / password123)

Example client

Sample vendors & projects

Research documents

🚀 Deployment
You can deploy to Render, Railway, or any cloud provider.
Requirements:

MySQL

MongoDB

SMTP server (or transactional email provider)

Cloudinary account

Set the environment variables from .env.example in production.

🛠 Dev Tools
docker-compose up -d → start MySQL, MongoDB, MailHog

npm run migration:generate → create new migration

npm run migration:run → run migrations

npm run seed → load sample data

npm run start:dev → start API with hot reload

📬 Default Services
Service	URL
API	http://localhost:3000
MailHog UI	http://localhost:8025
MySQL	localhost:3307
MongoDB	localhost:27017

📝 License
MIT – feel free to use and extend for your own projects.

yaml
Copy
Edit

---

✅ This README is **self-contained**, so you don’t need a separate `API_DOCS.md`.  
✅ It contains **examples for every endpoint**.  
✅ It’s ready to paste into your code editor as `README.md`.

---

Do you want me to also add **curl/Postman examples** for each API, so someone can literally copy-paste and test without thinking?






