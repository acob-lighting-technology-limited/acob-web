# Chatbot Dynamic Context Injection

## Overview

The ACOB chatbot now automatically fetches and uses real-time data from Sanity CMS to answer user questions about projects, updates, products, and jobs.

## How It Works

### 1. Intent Detection (`chat-intent-detection.ts`)

When a user sends a message, the system analyzes it to detect what they're asking about:

- **Projects**: Keywords like "project", "installation", "mini-grid", state names (Lagos, Kaduna, etc.)
- **Updates/News**: Keywords like "update", "news", "latest", "announcement"
- **Products**: Keywords like "product", "panel", "battery", "inverter"
- **Jobs**: Keywords like "job", "career", "hiring", "vacancy"

**Example:**

```
User: "Tell me about your projects in Lagos"
→ Detected Intent: Projects (state: Lagos, confidence: 0.9)
```

### 2. Data Fetching (`app/api/chat/route.ts`)

Based on the detected intent, the system fetches relevant data from Sanity:

```typescript
case 'projects':
  - Fetches all projects from Sanity
  - Filters by state (if mentioned)
  - Filters by category (if mentioned)
  - Formats top 5 results

case 'updates':
  - Fetches recent update posts
  - Returns top 5 most recent

case 'products':
  - Fetches all products
  - Filters by category (solar panels, batteries, inverters)
  - Returns top 8 results

case 'jobs':
  - Fetches active job postings
  - Returns all current openings
```

### 3. Context Formatting (`chat-context-formatter.ts`)

The fetched data is formatted into a concise, readable format for the AI:

```markdown
**ACOB Projects (15 total, showing 5):**

1. **Olooji Market Mini-Grid**
   - Location: Olooji, Kwara
   - Category: Mini-Grid
   - Date: 2024-03-15
   - Description: 27 kWp hybrid system...
   - Impact: 27kWp capacity, 500 beneficiaries

2. **...more projects...**
```

### 4. AI Response

The formatted data is injected into the conversation as a system message, and the AI uses it to generate an accurate, up-to-date response.

## Example Queries

### Projects

- "Tell me about your projects in Lagos"
- "What mini-grids have you installed?"
- "Show me your work in Kaduna"
- "What projects have you completed?"

### Updates/News

- "What's new at ACOB?"
- "Show me recent updates"
- "Latest news"

### Products

- "What solar panels do you have?"
- "Tell me about your batteries"
- "What products do you sell?"

### Jobs

- "Are you hiring?"
- "What job openings do you have?"
- "I want to work at ACOB"

## Benefits

✅ **Always Up-to-Date**: Pulls fresh data from Sanity on every request
✅ **Accurate Information**: Uses real project/product data, not hallucinated info
✅ **Location-Aware**: Automatically filters by Nigerian states
✅ **Category-Smart**: Understands different project/product categories
✅ **Graceful Degradation**: If Sanity fails, chatbot still works with general knowledge

## Technical Details

### Files Modified

- `app/api/chat/route.ts` - Main chat API with context injection
- `lib/utils/chat-intent-detection.ts` - Intent detection logic
- `lib/utils/chat-context-formatter.ts` - Data formatting utilities

### Dependencies Used

- Existing Sanity client (`sanity/lib/client.ts`)
- Existing helper functions (getProjects, getUpdatePosts, etc.)
- No new external packages required

### Performance

- Intent detection: ~1-2ms
- Sanity fetch: ~100-300ms (depending on data size)
- Filtering: ~1-5ms
- Total overhead: ~100-400ms per query (only when Sanity data is needed)

## Maintenance

### Adding New Intent Types

1. Add keywords to `chat-intent-detection.ts`
2. Add case handler in `route.ts`
3. Create formatter function in `chat-context-formatter.ts`

### Updating Filters

Edit the filter extraction functions in `chat-intent-detection.ts`:

- `extractProjectFilters()` - For project filtering
- `extractProductFilters()` - For product filtering

## Monitoring

In development, errors are logged to console:

```typescript
console.error('Error fetching Sanity data for chat:', sanityError);
```

In production, errors are silent and the chatbot continues with general knowledge.

## Future Enhancements

Potential improvements:

- Vector search for semantic matching (RAG)
- Caching frequently requested data
- Search query extraction for more precise filtering
- Multi-language support for intent detection
- Analytics tracking for popular queries
