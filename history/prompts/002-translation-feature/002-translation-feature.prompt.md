---
id: "002"
title: "Translation Feature Implementation"
stage: "general"
date: "2026-01-03"
---

# Translation Feature Implementation

## Prompt

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.

/sp.constitution  You have already implemented:
- Docusaurus book project
- Chatbot RAG integration
- Authentication (SignUp, Login, Profile)
- Chapter personalization button

Now COMPLETE the **English ↔ Urdu translation feature** with the following requirements:

1. Add a **language switch button** at the **start of every chapter**:
   - Button shows: [English] [Urdu]
   - Default is English
   - Clicking Urdu instantly translates all chapter content to Urdu
   - Clicking English switches back to English
   - Works **only for logged-in users**

2. Integrate **translation with current frontend stack only**:
   - Do NOT introduce React if not already used
   - Match existing Docusaurus theme
   - Clean CSS styling like the personalization button

3. Persist user preference:
   - Use localStorage or session
   - Remember selection for next time

4. Make sure this works dynamically:
   - Changing language does **not reload page**
   - Works on all chapters automatically
   - Compatible with other features:
     - Authentication
     - Chatbot
     - Chapter personalization button

5. Test in browser:
   - Language buttons visible at chapter start
   - Switching English/Urdu updates content
   - Buttons match site theme

6. Generate all required files, CSS, and logic:
   - No manual editing needed
   - Ready to run

7. After completion, report:
   - Language switch implemented
   - All chapters functional
   - UI buttons visible and working

## Response

I will implement the English ↔ Urdu translation feature for the Docusaurus book project. The implementation will include:

1. A language switch component that appears at the start of every chapter
2. Translation functionality that works dynamically without page reload
3. User preference persistence using localStorage
4. Compatibility with existing features (authentication, chatbot, personalization)
5. Proper styling that matches the existing Docusaurus theme

The implementation will be done using the existing Docusaurus/React infrastructure without introducing new frameworks.