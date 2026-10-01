# Bakti AI Guide

Bakti AI Guide is the on-site assistant for Bakti Seva. The browser talks only to this website. Groq is called from the server.

## Architecture

```
User → Chat UI (FloatingWidgets)
  → POST /api/chat
  → Zod validation + rate limit
  → Intent + website context retrieval (Prisma, offerings, events, policies)
  → Groq chat completions
  → JSON { success, message, sources, products, suggestions }
  → Chat UI
```

`GROQ_API_KEY` is server-only. Never use `NEXT_PUBLIC_GROQ_API_KEY`.

## Environment variables

| Name | Required | Default |
| --- | --- | --- |
| `GROQ_API_KEY` | yes | — |
| `GROQ_MODEL` | no | `openai/gpt-oss-20b` |
| `AI_MAX_TOKENS` | no | `1000` |
| `AI_TEMPERATURE` | no | `0.3` |

See `.env.example`.

## Groq model

The configured model is `openai/gpt-oss-20b` unless `GROQ_MODEL` is changed. The Groq SDK is used from `src/lib/ai/groq.ts` and must only be imported on the server.

## API endpoint

`POST /api/chat`

Body:

```json
{
  "message": "Show me brass diyas",
  "history": [{ "role": "user", "content": "Hello" }, { "role": "assistant", "content": "Namaste" }],
  "locale": "en"
}
```

`locale` may be `en`, `hi`, or `kn`. Hindi or Kannada script in the message overrides locale.

Success: `200` `{ success: true, message, sources, products, suggestions }`

Errors:

- `400` invalid body
- `429` rate limit (20 requests / minute / IP)
- `500` Groq or unexpected failure (generic message only)

Timeout is about 25 seconds.

## Context retrieval

`src/lib/ai/retrieve-context.ts` classifies intent with keywords, then loads only related records:

- Products: Prisma (name/description/category search), fallback `SHOP_CATALOG`
- Puja / homa / seva: `SACRED_OFFERINGS` plus active Prisma `Seva` rows
- Events: `EVENTS` (upcoming unless the user asks for past events)
- Policies and contact: copy from live pages in `website-context.ts`

Maximum product cards returned to the UI: 5.

## Frontend connection

`src/components/layout/FloatingWidgets.tsx` posts to `/api/chat`. Conversation history is trimmed to 16 messages and stored in `sessionStorage` (`baktiseva.chat.session`). Set `CHAT_PERSIST_ENABLED` to `false` in that file to disable persistence.

Header language is stored in `baktiseva.locale`.

## Rate limiting

In-memory per IP: 20 requests per 60 seconds. Suitable for a single Node instance. Use a shared store if you run multiple servers.

## Languages

English, Hindi, Kannada. The model is instructed to answer in the selected locale and to follow the visitor’s language when they type in another script.

## Testing

```bash
curl -s -X POST http://localhost:3000/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"What poojas are available?\",\"history\":[],\"locale\":\"en\"}"
```

Invalid body should return 400. Rapid repeated posts should return 429.

On the site: open Bakti AI Guide, send a message, confirm loading dots, suggestion chips, reset, close/reopen, and Hindi/Kannada questions.

## Troubleshooting

- `Unable to generate a response right now` — missing/invalid `GROQ_API_KEY`, Groq outage, or timeout.
- Empty product answers — Prisma unreachable; catalog fallback still used for static shop items.
- Hydration warning on the widget — hard refresh; the chat panel mounts after the client is ready.
