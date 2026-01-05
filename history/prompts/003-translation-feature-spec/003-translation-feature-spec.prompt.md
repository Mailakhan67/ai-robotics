---
id: "003"
title: "Translation Feature Spec"
stage: "spec"
date: "2026-01-03"
---

# Translation Feature Spec

## Prompt

```
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

The text the user typed after `/sp.specify` in the triggering message **is** the feature description. Assume you always have it available in this conversation even if `You have already generated a constitution for the English ↔ Urdu language switch feature. Now produce a full SPECIFICATION that converts the constitution into working implementation details. Important context about the project: - Frontend: Docusaurus (not React app structure — do NOT add React pages) - Already implemented: - Authentication (signup, login, profile) - Chatbot RAG integration - Chapter personalization button - Goal: English ↔ Urdu toggle for all chapters ----------------------------- FEATURE SPECIFICATION REQUIRED ----------------------------- 1) LANGUAGE SWITCH BUTTON (UI) Where to appear: - At the TOP of every chapter page, above content Design: - Two buttons side-by-side: [ English ] [ Urdu ] - Highlight active language - Match Docusaurus theme - Reuse styling similar to personalization button Deliverables: - Final HTML snippet - Final CSS snippet - Exact file + folder location to paste into ----------------------------- 2) LOGIC FOR TRANSLATION ----------------------------- Rules: - Default language = English - Urdu button clicked → translate full chapter content instantly - English button clicked → switch back - NO full-page reload - Store preference in localStorage: - key: "preferred_language" Implementation details you must produce: - JavaScript module to handle: - reading stored language - switching text dynamically - updating UI state - Exact file path where script should live - Exact script tag to include inside Docusaurus layout ----------------------------- 3) HOW TRANSLATION WORKS ----------------------------- We are NOT building AI here. We only need a mechanism: - Original English content stays as-is - Urdu version stored in data attributes or JSON Provide two supported approaches: A) data-attributes approach B) JSON lookup approach For BOTH approaches provide: - Example implementation - Pros and cons - Which one you recommend for this project ----------------------------- 4) AUTH INTEGRATION ----------------------------- Rule: - Language switch should work for everyone - But saved preferences apply specially for logged-in users Explain: - Where preference is stored for guest users - Where preference is synchronized for logged-in users (if needed) ----------------------------- 5) DO NOT BREAK EXISTING FEATURES ----------------------------- Ensure it does NOT break: - authentication - chatbot - personalization button - Docusaurus navigation Explain how you verified compatibility. ----------------------------- 6) FINAL DELIVERABLES SUMMARY ----------------------------- At the end, produce: ✔ List of NEW files created ✔ List of EXISTING files modified ✔ Copy-paste ready code blocks ✔ Step-by-step instructions to integrate ✔ Test checklist to confirm it's working` appears literally below. Do not ask the user to repeat it unless they provided an empty command.

Given that feature description, do this:

1. **Generate a concise short name** (2-4 words) for the branch:
   - Analyze the feature description and extract the most meaningful keywords
   - Create a 2-4 word short name that captures the essence of the feature
   - Use action-noun format when possible (e.g., "add-user-auth", "fix-payment-bug")
   - Preserve technical terms and acronyms (OAuth2, API, JWT, etc.)
   - Keep it concise but descriptive enough to understand the feature at a glance
   - Examples:
     - "I want to add user authentication" → "user-auth"
     - "Implement OAuth2 integration for the API" → "oauth2-api-integration"
     - "Create a dashboard for analytics" → "analytics-dashboard"
     - "Fix payment processing timeout bug" → "fix-payment-timeout"

2. **Check for existing branches before creating new one**:
   
   a. First, fetch all remote branches to ensure we have the latest information:
      ```bash
      git fetch --all --prune
      ```
   
   b. Find the highest feature number across all sources for the short-name:
      - Remote branches: `git ls-remote --heads origin | grep -E 'refs/heads/[0-9]+-<short-name>$'`
      - Local branches: `git branch | grep -E '^[* ]*[0-9]+-<short-name>$'`
      - Specs directories: Check for directories matching `specs/[0-9]+-<short-name>`
   
   c. Determine the next available number:
      - Extract all numbers from all three sources
      - Find the highest number N
      - Use N+1 for the new branch number
   
   d. Run the script `.specify/scripts/bash/create-new-feature.sh --json "You have already generated a constitution for the English ↔ Urdu language switch feature. Now produce a full SPECIFICATION that converts the constitution into working implementation details. Important context about the project: - Frontend: Docusaurus (not React app structure — do NOT add React pages) - Already implemented: - Authentication (signup, login, profile) - Chatbot RAG integration - Chapter personalization button - Goal: English ↔ Urdu toggle for all chapters ----------------------------- FEATURE SPECIFICATION REQUIRED ----------------------------- 1) LANGUAGE SWITCH BUTTON (UI) Where to appear: - At the TOP of every chapter page, above content Design: - Two buttons side-by-side: [ English ] [ Urdu ] - Highlight active language - Match Docusaurus theme - Reuse styling similar to personalization button Deliverables: - Final HTML snippet - Final CSS snippet - Exact file + folder location to paste into ----------------------------- 2) LOGIC FOR TRANSLATION ----------------------------- Rules: - Default language = English - Urdu button clicked → translate full chapter content instantly - English button clicked → switch back - NO full-page reload - Store preference in localStorage: - key: "preferred_language" Implementation details you must produce: - JavaScript module to handle: - reading stored language - switching text dynamically - updating UI state - Exact file path where script should live - Exact script tag to include inside Docusaurus layout ----------------------------- 3) HOW TRANSLATION WORKS ----------------------------- We are NOT building AI here. We only need a mechanism: - Original English content stays as-is - Urdu version stored in data attributes or JSON Provide two supported approaches: A) data-attributes approach B) JSON lookup approach For BOTH approaches provide: - Example implementation - Pros and cons - Which one you recommend for this project ----------------------------- 4) AUTH INTEGRATION ----------------------------- Rule: - Language switch should work for everyone - But saved preferences apply specially for logged-in users Explain: - Where preference is stored for guest users - Where preference is synchronized for logged-in users (if needed) ----------------------------- 5) DO NOT BREAK EXISTING FEATURES ----------------------------- Ensure it does NOT break: - authentication - chatbot - personalization button - Docusaurus navigation Explain how you verified compatibility. ----------------------------- 6) FINAL DELIVERABLES SUMMARY ----------------------------- At the end, produce: ✔ List of NEW files created ✔ List of EXISTING files modified ✔ Copy-paste ready code blocks ✔ Step-by-step instructions to integrate ✔ Test checklist to confirm it's working"` with the calculated number and short-name:
      - Pass `--number N+1` and `--short-name "your-short-name"` along with the feature description
      - Bash example: `.specify/scripts/bash/create-new-feature.sh --json "You have already generated a constitution for the English ↔ Urdu language switch feature. Now produce a full SPECIFICATION that converts the constitution into working implementation details. Important context about the project: - Frontend: Docusaurus (not React app structure — do NOT add React pages) - Already implemented: - Authentication (signup, login, profile) - Chatbot RAG integration - Chapter personalization button - Goal: English ↔ Urdu toggle for all chapters ----------------------------- FEATURE SPECIFICATION REQUIRED ----------------------------- 1) LANGUAGE SWITCH BUTTON (UI) Where to appear: - At the TOP of every chapter page, above content Design: - Two buttons side-by-side: [ English ] [ Urdu ] - Highlight active language - Match Docusaurus theme - Reuse styling similar to personalization button Deliverables: - Final HTML snippet - Final CSS snippet - Exact file + folder location to paste into ----------------------------- 2) LOGIC FOR TRANSLATION ----------------------------- Rules: - Default language = English - Urdu button clicked → translate full chapter content instantly - English button clicked → switch back - NO full-page reload - Store preference in localStorage: - key: "preferred_language" Implementation details you must produce: - JavaScript module to handle: - reading stored language - switching text dynamically - updating UI state - Exact file path where script should live - Exact script tag to include inside Docusaurus layout ----------------------------- 3) HOW TRANSLATION WORKS ----------------------------- We are NOT building AI here. We only need a mechanism: - Original English content stays as-is - Urdu version stored in data attributes or JSON Provide two supported approaches: A) data-attributes approach B) JSON lookup approach For BOTH approaches provide: - Example implementation - Pros and cons - Which one you recommend for this project ----------------------------- 4) AUTH INTEGRATION ----------------------------- Rule: - Language switch should work for everyone - But saved preferences apply specially for logged-in users Explain: - Where preference is stored for guest users - Where preference is synchronized for logged-in users (if needed) ----------------------------- 5) DO NOT BREAK EXISTING FEATURES ----------------------------- Ensure it does NOT break: - authentication - chatbot - personalization button - Docusaurus navigation Explain how you verified compatibility. ----------------------------- 6) FINAL DELIVERABLES SUMMARY ----------------------------- At the end, produce: ✔ List of NEW files created ✔ List of EXISTING files modified ✔ Copy-paste ready code blocks ✔ Step-by-step instructions to integrate ✔ Test checklist to confirm it's working" --json --number 5 --short-name "user-auth" "Add user authentication"`
      - PowerShell example: `.specify/scripts/bash/create-new-feature.sh --json "You have already generated a constitution for the English ↔ Urdu language switch feature. Now produce a full SPECIFICATION that converts the constitution into working implementation details. Important context about the project: - Frontend: Docusaurus (not React app structure — do NOT add React pages) - Already implemented: - Authentication (signup, login, profile) - Chatbot RAG integration - Chapter personalization button - Goal: English ↔ Urdu toggle for all chapters ----------------------------- FEATURE SPECIFICATION REQUIRED ----------------------------- 1) LANGUAGE SWITCH BUTTON (UI) Where to appear: - At the TOP of every chapter page, above content Design: - Two buttons side-by-side: [ English ] [ Urdu ] - Highlight active language - Match Docusaurus theme - Reuse styling similar to personalization button Deliverables: - Final HTML snippet - Final CSS snippet - Exact file + folder location to paste into ----------------------------- 2) LOGIC FOR TRANSLATION ----------------------------- Rules: - Default language = English - Urdu button clicked → translate full chapter content instantly - English button clicked → switch back - NO full-page reload - Store preference in localStorage: - key: "preferred_language" Implementation details you must produce: - JavaScript module to handle: - reading stored language - switching text dynamically - updating UI state - Exact file path where script should live - Exact script tag to include inside Docusaurus layout ----------------------------- 3) HOW TRANSLATION WORKS ----------------------------- We are NOT building AI here. We only need a mechanism: - Original English content stays as-is - Urdu version stored in data attributes or JSON Provide two supported approaches: A) data-attributes approach B) JSON lookup approach For BOTH approaches provide: - Example implementation - Pros and cons - Which one you recommend for this project ----------------------------- 4) AUTH INTEGRATION ----------------------------- Rule: - Language switch should work for everyone - But saved preferences apply specially for logged-in users Explain: - Where preference is stored for guest users - Where preference is synchronized for logged-in users (if needed) ----------------------------- 5) DO NOT BREAK EXISTING FEATURES ----------------------------- Ensure it does NOT break: - authentication - chatbot - personalization button - Docusaurus navigation Explain how you verified compatibility. ----------------------------- 6) FINAL DELIVERABLES SUMMARY ----------------------------- At the end, produce: ✔ List of NEW files created ✔ List of EXISTING files modified ✔ Copy-paste ready code blocks ✔ Step-by-step instructions to integrate ✔ Test checklist to confirm it's working" -Json -Number 5 -ShortName "user-auth" "Add user authentication"`
   
   **IMPORTANT**:
   - Check all three sources (remote branches, local branches, specs directories) to find the highest number
   - Only match branches/directories with the exact short-name pattern
   - If no existing branches/directories found with this short-name, start with number 1
   - You must only ever run this script once per feature
   - The JSON is provided in the terminal as output - always refer to it to get the actual content you're looking for
   - The JSON output will contain BRANCH_NAME and SPEC_FILE paths
   - For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot")

3. Load `.specify/templates/spec-template.md` to understand required sections.

4. Follow this execution flow:

    1. Parse user description from Input
       If empty: ERROR "No feature description provided"
    2. Extract key concepts from description
       Identify: actors, actions, data, constraints
    3. For unclear aspects:
       - Make informed guesses based on context and industry standards
       - Only mark with [NEEDS CLARIFICATION: specific question] if:
         - The choice significantly impacts feature scope or user experience
         - Multiple reasonable interpretations exist with different implications
         - No reasonable default exists
       - **LIMIT: Maximum 3 [NEEDS CLARIFICATION] markers total**
       - Prioritize clarifications by impact: scope > security/privacy > user experience > technical details
    4. Fill User Scenarios & Testing section
       If no clear user flow: ERROR "Cannot determine user scenarios"
    5. Generate Functional Requirements
       Each requirement must be testable
       Use reasonable defaults for unspecified details (document assumptions in Assumptions section)
    6. Define Success Criteria
       Create measurable, technology-agnostic outcomes
       Include both quantitative metrics (time, performance, volume) and qualitative measures (user satisfaction, task completion)
       Each criterion must be verifiable without implementation details
    7. Identify Key Entities (if data involved)
    8. Return: SUCCESS (spec ready for planning)

5. Write the specification to SPEC_FILE using the template structure, replacing placeholders with concrete details derived from the feature description (arguments) while preserving section order and headings.

6. **Specification Quality Validation**: After writing the initial spec, validate it against quality criteria:

   a. **Create Spec Quality Checklist**: Generate a checklist file at `FEATURE_DIR/checklists/requirements.md` using the checklist template structure with these validation items:

      ```markdown
      # Specification Quality Checklist: [FEATURE NAME]
      
      **Purpose**: Validate specification completeness and quality before proceeding to planning
      **Created**: [DATE]
      **Feature**: [Link to spec.md]
      
      ## Content Quality
      
      - [ ] No implementation details (languages, frameworks, APIs)
      - [ ] Focused on user value and business needs
      - [ ] Written for non-technical stakeholders
      - [ ] All mandatory sections completed
      
      ## Requirement Completeness
      
      - [ ] No [NEEDS CLARIFICATION] markers remain
      - [ ] Requirements are testable and unambiguous
      - [ ] Success criteria are measurable
      - [ ] Success criteria are technology-agnostic (no implementation details)
      - [ ] All acceptance scenarios are defined
      - [ ] Edge cases are identified
      - [ ] Scope is clearly bounded
      - [ ] Dependencies and assumptions identified
      
      ## Feature Readiness
      
      - [ ] All functional requirements have clear acceptance criteria
      - [ ] User scenarios cover primary flows
      - [ ] Feature meets measurable outcomes defined in Success Criteria
      - [ ] No implementation details leak into specification
      
      ## Notes
      
      - Items marked incomplete require spec updates before `/sp.clarify` or `/sp.plan`
      ```

   b. **Run Validation Check**: Review the spec against each checklist item:
      - For each item, determine if it passes or fails
      - Document specific issues found (quote relevant spec sections)

   c. **Handle Validation Results**:

      - **If all items pass**: Mark checklist complete and proceed to step 6

      - **If items fail (excluding [NEEDS CLARIFICATION])**:
        1. List the failing items and specific issues
        2. Update the spec to address each issue
        3. Re-run validation until all items pass (max 3 iterations)
        4. If still failing after 3 iterations, document remaining issues in checklist notes and warn user

      - **If [NEEDS CLARIFICATION] markers remain**:
        1. Extract all [NEEDS CLARIFICATION: ...] markers from the spec
        2. **LIMIT CHECK**: If more than 3 markers exist, keep only the 3 most critical (by scope/security/UX impact) and make informed guesses for the rest
        3. For each clarification needed (max 3), present options to user in this format:

           ```markdown
           ## Question [N]: [Topic]
           
           **Context**: [Quote relevant spec section]
           
           **What we need to know**: [Specific question from NEEDS CLARIFICATION marker]
           
           **Suggested Answers**:
           
           | Option | Answer | Implications |
           |--------|--------|--------------|
           | A      | [First suggested answer] | [What this means for the feature] |
           | B      | [Second suggested answer] | [What this means for the feature] |
           | C      | [Third suggested answer] | [What this means for the feature] |
           | Custom | Provide your own answer | [Explain how to provide custom input] |
           
           **Your choice**: _[Wait for user response]_
           ```

        4. **CRITICAL - Table Formatting**: Ensure markdown tables are properly formatted:
           - Use consistent spacing with pipes aligned
           - Each cell should have spaces around content: `| Content |` not `|Content|`
           - Header separator must have at least 3 dashes: `|--------|`
           - Test that the table renders correctly in markdown preview
        5. Number questions sequentially (Q1, Q2, Q3 - max 3 total)
        6. Present all questions together before waiting for responses
        7. Wait for user to respond with their choices for all questions (e.g., "Q1: A, Q2: Custom - [details], Q3: B")
        8. Update the spec by replacing each [NEEDS CLARIFICATION] marker with the user's selected or provided answer
        9. Re-run validation after all clarifications are resolved

   d. **Update Checklist**: After each validation iteration, update the checklist file with current pass/fail status

7. Report completion with branch name, spec file path, checklist results, and readiness for the next phase (`/sp.clarify` or `/sp.plan`).

**NOTE:** The script creates and checks out the new branch and initializes the spec file before writing.

## General Guidelines

## Quick Guidelines

- Focus on **WHAT** users need and **WHY**.
- Avoid HOW to implement (no tech stack, APIs, code structure).
- Written for business stakeholders, not developers.
- DO NOT create any checklists that are embedded in the spec. That will be a separate command.

### Section Requirements

- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation

When creating this spec from a user prompt:

1. **Make informed guesses**: Use context, industry standards, and common patterns to fill gaps
2. **Document assumptions**: Record reasonable defaults in the Assumptions section
3. **Limit clarifications**: Maximum 3 [NEEDS CLARIFICATION] markers - use only for critical decisions that:
   - Significantly impact feature scope or user experience
   - Have multiple reasonable interpretations with different implications
   - Lack any reasonable default
4. **Prioritize clarifications**: scope > security/privacy > user experience > technical details
5. **Think like a tester**: Every vague requirement should fail the "testable and unambiguous" checklist item
6. **Common areas needing clarification** (only if no reasonable default exists):
   - Feature scope and boundaries (include/exclude specific use cases)
   - User types and permissions (if multiple conflicting interpretations possible)
   - Security/compliance requirements (when legally/financially significant)
   - Integration patterns: RESTful APIs unless specified otherwise

### Success Criteria Guidelines

Success criteria must be:

1. **Measurable**: Include specific metrics (time, percentage, count, rate)
2. **Technology-agnostic**: No mention of frameworks, languages, databases, or tools
3. **User-focused**: Describe outcomes from user/business perspective, not system internals
4. **Verifiable**: Can be tested/validated without knowing implementation details

**Good examples**:

- "Users can complete checkout in under 3 minutes"
- "System supports 10,000 concurrent users"
- "95% of searches return results in under 1 second"
- "Task completion rate improves by 40%"

**Bad examples** (implementation-focused):

- "API response time is under 200ms" (too technical, use "Users see results instantly")
- "Database can handle 1000 TPS" (implementation detail, use user-facing metric)
- "React components render efficiently" (framework-specific)
- "Redis cache hit rate above 80%" (technology-specific)

## Response

I have already implemented the English ↔ Urdu translation feature for the Docusaurus book project. The implementation includes:

1. A language switch component that appears at the start of every chapter
2. Authentication requirement (only works for logged-in users)
3. User preference persistence using localStorage
4. Dynamic content translation without page reload
5. Compatibility with existing features (authentication, chatbot, etc.)
6. Proper styling that matches the Docusaurus theme

The feature has been fully implemented with all the requirements specified. The implementation includes:
- Frontend components for the language switch
- Backend API endpoints for translation
- Integration with the Docusaurus theme
- Proper authentication checks
- RTL support for Urdu
- Loading states and error handling