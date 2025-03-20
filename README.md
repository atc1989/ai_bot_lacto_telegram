## Quick Start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com) (Node Package Manager)
- [PostgreSQL](https://www.postgresql.org) (Database)

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up PostgreSQL Database**

1. Install PostgreSQL if you haven't already.
2. Create a new PostgreSQL database for the project.

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content :<br/>
(replace the placeholder values with your actual data)

```env
# Telegram Bot (Col. Lacto)
BOT_ID = Backend identifier for the Telegram bot
BOT_TOKEN = Access token for the Telegram bot
BOT_SECRET_KEY = Webhook secret key for the Telegram bot

# Telegram Channel (Gut Guardians Academy)
TG_CHANNEL_ID = Telegram ID of the channel (-100xxxxxxxxxx)
TG_CHANNEL_URL = Invite link to the channel (https://t.me/xxxxxxxxxxxxxxxxx)

# AI Model (OpenAI's ChatGPT)
AI_MODEL_TOKEN = API key of the AI model used (sk-proj-xxxxxxxxxx...)

# Backend/Database URLs
BACKEND_URL = Base URL for the Backend API endpoints
DATABASE_URL = PostgreSQL database URL

# Server Configs
PORT = Port on which the server to run
SERVER_URL = Base URL of the server (use ngrok's generated URL for development)
```

**Run Prisma Migrations**

To ensure the database schema is up to date, run the following Prisma commands:

```bash
npx prisma migrate dev --name init
```

**Running the Project**

```bash
npm run dev
```
