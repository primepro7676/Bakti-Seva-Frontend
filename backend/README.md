# Bakti Seva Backend

Production Express + TypeScript API for the Bakti Seva website.

## Stack

- Node.js + Express + TypeScript
- Prisma ORM + PostgreSQL
- Groq API (chatbot)
- Zod validation, Helmet, CORS, rate limiting

## Setup

```bash
cd backend
cp .env.example .env
# Fill DATABASE_URL, DIRECT_URL, GROQ_API_KEY, GROQ_MODEL, FRONTEND_URL
npm install
npm run prisma:generate
npx prisma migrate deploy
npm run dev
```

Server defaults to `http://localhost:5000`.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled server |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Create/apply migrations |
| `npm run prisma:studio` | Open Prisma Studio |

## API

### Health

- `GET /api/health`
- `GET /api/health/database`

### Chatbot

- `POST /api/chatbot/message`  
  Body: `{ "message": "..." }`  
  Response: `{ "success": true, "reply": "..." }`

### Contact

- `POST /api/contact`  
  Body: `{ name, email, phone?, subject?, message }`

### Enquiries

- `POST /api/enquiries`  
  Body: `{ name, phone, email, service, message }`
- `GET /api/enquiries`  
  Ready for future admin authentication

## Security notes

- Secrets stay in `backend/.env` only
- CORS allows `FRONTEND_URL` (+ localhost in development)
- Never use `origin: "*"` with credentials
- Groq API key is never sent to the browser

## Frontend connection

Set in the Next.js project `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
