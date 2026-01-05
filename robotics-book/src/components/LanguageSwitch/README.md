# English ↔ Urdu Language Toggle Feature

## Overview
This feature provides an English ↔ Urdu language toggle for all chapter pages in the Docusaurus-based robotics course book. The feature allows users to switch between English and Urdu content dynamically without page reload, with preferences persisted via localStorage.

## Features
- Toggle between English and Urdu languages
- Content switches instantly without page reload
- Language preference saved in localStorage
- Right-to-left (RTL) support for Urdu content
- Works for both authenticated and non-authenticated users
- Maintains existing functionality (authentication, chatbot, personalization)
- Language toggle available in navbar for easy access from any page

## Implementation Details

### Components
- `LanguageSwitch`: The toggle button component
- `TranslationWrapper`: Handles content translation
- `TranslationProvider`: Context provider for language state

### Files
- `src/components/LanguageSwitch/`: Main component implementation
- `src/services/translationService.ts`: Translation logic
- `src/utils/languageUtils.ts`: Utility functions
- `i18n/ur/`: Urdu translation files

### How It Works
1. The language toggle is injected at the top of each chapter page via `src/theme/DocItem/Content.tsx`
2. When a user selects a language, the content is translated using the translation service
3. Language preference is saved to localStorage and applied on subsequent visits
4. For Urdu content, RTL styling is applied to ensure proper text alignment

## Usage
The language toggle appears automatically at the top of each chapter page. Users can click the "English" or "Urdu" button to switch languages. The selected language preference is remembered across page visits.

## Technical Details
- Uses localStorage for language preference persistence
- Implements RTL support for Urdu content
- Includes comprehensive word-to-word translation mapping
- Handles both simple and complex content translation
- Maintains accessibility standards with proper ARIA labels

## Architecture Notes
- Context and hooks are separated into TranslationContext.tsx to avoid circular dependencies
- TranslationProvider wraps content to provide language state (exported from index.tsx)
- TranslationWrapper handles content translation independently (imports useTranslation from TranslationContext)
- LanguageSwitch component provides UI controls for language selection (default export from index.tsx)

## Compatibility
- Works with existing authentication system
- Compatible with chatbot functionality
- Preserves personalization features
- Maintains all existing navigation functionality