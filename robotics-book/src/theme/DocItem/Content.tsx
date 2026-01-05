import React from 'react';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import TranslationWrapper from '@site/src/components/LanguageSwitch/TranslationWrapper';
import MDXContent from '@theme/MDXContent';

export default function DocItemContent({children}) {
  const {metadata} = useDoc();
  const contentId = metadata.id; // Use document ID as content identifier

  return (
    <div className={ThemeClassNames.docs.docMarkdocContent}>
      <TranslationWrapper contentId={contentId}>
        <MDXContent>
          {children}
        </MDXContent>
      </TranslationWrapper>
    </div>
  );
}