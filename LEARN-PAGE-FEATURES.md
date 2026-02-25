# Learn with Grio — Feature Summary

## Page: `/dashboard/learn`

Dedicated page for **independent learners** to chat with the Grio AI learning assistant. Available in the sidebar when signed in as a learner (Dashboard → **Learn with Grio**).

---

## Features Implemented

### 1. **Clear page identity**
- **Title:** "Learn with Grio"
- **Subtitle:** "Chat with Grio to get explanations, practice questions, and feedback on your subjects."
- Sets the page as the place to learn with the AI, not generic chat.

### 2. **Grio identity**
- **Grio card** at the top: avatar (✦), name "Grio", tagline "Your AI learning assistant".
- **Studying context:** shows "Studying: [Subject]" when the learner has subjects (from app context).
- **New chat** button to clear the thread and start over.

### 3. **Learner vs Grio in the chat**
- **You:** learner messages on the **right**, dark blue bubble, labeled "You".
- **Grio:** AI messages on the **left**, white bubble with border, Grio avatar (✦), labeled "Grio".
- **Loading state:** "Grio is thinking..." while waiting for a response.

### 4. **Learning-focused input and prompts**
- **Placeholder:** "Ask Grio anything about your subject..."
- **Suggested prompts** (shown when the thread has only the welcome message):
  - "Explain this concept in simpler terms"
  - "Give me a practice question on this topic"
  - "Summarise the key points I should remember"
  - "I don't understand — can you give an example?"
  - "What's the best way to revise this?"
- **Footer tip:** "Ask for an explanation, a practice question, or a summary of a topic."

### 5. **Welcome and conversation flow**
- **Welcome message** from Grio on load: introduces Grio and invites the learner to ask questions.
- **Send:** user can type and send; Grio replies via `generateFollowUpResponse` (existing API).
- **New chat:** resets to the welcome message only.

### 6. **Navigation**
- **Sidebar:** "Learn with Grio" (✦) added for independent learners, between Dashboard and Subjects.

---

## How to view

1. Run the app: `npm run dev` (e.g. on port 3009: `npm run dev -- -p 3009`).
2. Sign in as an **Independent Learner** (e.g. from the login demo accounts).
3. In the sidebar, click **Learn with Grio**.
4. Use the suggested prompts or type a question and click Send to see Grio’s reply.

---

## Technical notes

- **API:** Uses existing `generateFollowUpResponse(question: string)` from `@/lib/api` for AI replies.
- **State:** Messages kept in React state; no persistence yet (refresh clears chat).
- **Accessibility:** Labels and structure support screen readers; focus and disabled states on input/button.
