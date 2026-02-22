# Lazy To Cook - Web Application

Food delivery platform built with Node.js, Express, React, and MySQL.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React
- **Database:** MySQL

## Prerequisites

- [Node.js](https://nodejs.org/en/) and NPM
- [MySQL](https://dev.mysql.com/downloads/)

## Setup

### Backend

1. Start MySQL server
2. Edit `app/setup/db_init_queries.json` if needed
3. Run setup:
   ```bash
   cd app
   npm run setup
   ```

This installs dependencies and initializes the database.

**⚠️ Warning:** Setup drops existing tables. Use only for initial installation, not on production databases.

### Frontend

**Build:**
```bash
cd app/src/client
npm install
npm run build
```
Access at `http://localhost:<backend_port>/app/`

**Development Mode:**
```bash
cd app/src/client
npm install
npm start
```
Access at `http://localhost:3000`
