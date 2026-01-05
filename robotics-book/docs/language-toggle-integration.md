# Language Toggle Integration Guide

## Integration with Docusaurus

The English ↔ Urdu language toggle is integrated into the Docusaurus documentation site using the following approach:

### 1. Component Injection
The language toggle is automatically injected at the top of every chapter page through the `src/theme/DocItem/Content.tsx` file. This ensures that the toggle appears consistently across all documentation pages without requiring changes to individual markdown files.

### 2. Docusaurus Configuration
The `docusaurus.config.ts` file has been updated to include Urdu as a supported locale:

```typescript
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'ur'],
},
```

### 3. Translation Process
When a user switches languages:
1. The TranslationProvider context updates the current language
2. The TranslationWrapper extracts text content from the page
3. The translation service maps English content to Urdu using predefined mappings
4. The translated content is displayed with appropriate RTL styling
5. The user's language preference is saved to localStorage

### 4. RTL Support
Urdu content is displayed with right-to-left text direction using CSS classes:
- The `urdu-mode` class is added to the document body when Urdu is selected
- This class applies RTL styling to headings, paragraphs, and other content elements
- The language toggle buttons themselves remain in LTR direction for usability

### 5. Persistence
Language preferences are stored in localStorage using the key `preferredLanguage`. This ensures that when users return to the site, their preferred language is automatically applied.

## File Structure
```
src/
├── components/
│   └── LanguageSwitch/
│       ├── index.tsx          # Main language toggle component
│       ├── TranslationWrapper.tsx  # Content translation wrapper
│       ├── styles.module.css  # CSS for language toggle
│       └── README.md          # Component documentation
├── services/
│   └── translationService.ts  # Translation logic and mappings
├── utils/
│   └── languageUtils.ts       # Language utility functions
├── theme/
│   └── DocItem/
│       └── Content.tsx        # Injects language toggle on all pages
└── pages/
    └── api/
        └── translate-mock.ts  # Mock translation API (not used in Docusaurus)
i18n/
└── ur/
    ├── docusaurus-plugin-content-docs/
    │   └── current/
    │       └── sidebar.json   # Urdu sidebar translations
    ├── docusaurus-theme-classic/
    │   ├── navbar.json        # Urdu navbar translations
    │   └── footer.json        # Urdu footer translations
    └── code.json              # Code translations (if any)
```

## Extending Translations
To add more English ↔ Urdu translations:
1. Update the `englishToUrduMap` object in `src/services/translationService.ts`
2. Add new key-value pairs following the existing format
3. The translation service will automatically use these new mappings

## Testing
The language toggle functionality can be tested by:
1. Navigating to any chapter page
2. Clicking the "Urdu" button to switch to Urdu
3. Verifying that content is translated and RTL styling is applied
4. Clicking the "English" button to switch back to English
5. Refreshing the page to verify that the language preference is preserved