# AI Career Coach

**AI Career Coach** is a web application that allows users to interact with an AI-powered career expert in real time. Built with Next.js (App Router), Clerk for authentication, Inngest for event-driven workflows, and LangChain/OpenAI for AI analysis, it provides:

- **Conversational Interface**: Chat UI where users ask career-related questions.
- **Chat History**: Persisted chat history per user and session.
- **New Chat & Chat Management**: Generate new chat sessions and view past conversations.
- **AI Processing Pipeline**: Uses Inngest functions to process and analyze messages asynchronously.
- **Resume Analysis**: Upload PDF resumes, extract text, and analyze structure/content via AI.
- **Authentication**: Clerk integration for secure sign-in/sign-out and protected routes.
- **Code Review**:Paste your code to receive AI-driven feedback and best practices suggestions. .

---

## Features

1. **Real-Time Chat**: Send messages to the AI agent and receive suggestions, advice, and tailored career guidance.
2. **Persistent History**: All chats saved in MongoDB; users can revisit previous sessions.
3. **Resume Upload & Analysis**: Upload PDF resumes to get a detailed JSON analysis (scores, feedback, improvement tips).
4. **Code Review**: Paste your code to receive AI-driven feedback and best practices suggestions.
5. **Dynamic Routing**: Each chat and review session has a unique URL (`/chat-agent/[chatId]`, `/code-review`).
6. **Responsive Design**: Tailwind CSS for mobile-first, responsive layouts.
7. **Secure Authentication**: Only authenticated users can access chat and review features; Clerk pop-up sign-in.

---

## Tech Stack

- **Next.js** (App Router, Server & Client Components)
- **React** & **Tailwind CSS** for UI
- **Clerk** for authentication & user management
- **Inngest** for serverless workflows and event-driven functions
- **LangChain** & **OpenAI** (Gemini) for AI chat and resume analysis
- **MongoDB** (via Mongoose) for persistence
- **Axios** for API requests

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd ai-irr
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set environment variables** (`.env.local`):
   ```txt
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_API_URL=http://localhost:3000
   GOOGLE_GENAI_API_KEY=
   INNGEST_SIGNING_KEY=local.dev
   INNGEST_SERVER_HOST=http://127.0.0.1:8288
   DATABASE_URL=
   IMAGEKIT_PUBLIC_KEY=
   IMAGEKIT_PRIVATE_KEY=
   IMAGEKIT_URL_ENDPOINT=
   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```
5. **Open** `http://localhost:3000`
6. **inngest** npx inngest-cli@latest dev -> - http://127.0.0.1:8288 (http://localhost:8288)
7. **live** - https://ai-career-coach-hazel-three.vercel.app/

---

## Folder Structure

```
/app
  /api
    /ai-chat-agent      # API route for chat send
    /chat-history       # Fetch saved chat history
    /ai-resume-agent    # Handle resume upload & analysis
    /inngest            # Inngest webhook endpoint
  /chat-agent
    /[chatId]
      page.jsx          # Chat interface page
  /resume-analyzer
    /[resumeId]
      page.jsx          # Resume analysis page
/components
  /ui                  # Button, Input, Dialog, etc.
  /home                # HeroSection, FeatureGrid
  /settings            # Account settings component
/configs
  aiChatSchema.js
  aiResumeAnalyzer.js
  userSchema.js
  db.js                # MongoDB connection
/inngest
  functions.js         # Inngest functions definitions
```

---

## Next Steps

- Add streaming responses for chat (real-time typing)
- Integrate voice input/output for hands-free chat
- Add chat summarization and topic segmentation
- Implement rate limiting and usage quotas
- Polish UI with animations (Framer Motion)

---

## UPComing

- AI Interview Agent With Feedback
- DashBoard with progress Bars
- Ai Resource and Cources

## Contact

**Email** - jayanthmurala@1gamil.com

**LinkedIn** - https://www.linkedin.com/in/jayanth-murala-0045b2281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app

**Instagram**- @jayanthmurala\_

© 2025 AI Career Coach. All rights reserved.
