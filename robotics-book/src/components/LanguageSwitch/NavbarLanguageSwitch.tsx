import React from 'react';
import { useLocation } from '@docusaurus/router';
import { useTranslation } from '@site/src/components/LanguageSwitch';
import styles from './styles.module.css';

const NavbarLanguageSwitch = () => {
  const { currentLanguage, switchLanguage } = useTranslation();
  const location = useLocation();

  // Don't show on certain pages if needed (optional)
  const shouldShow = true; // Always show for now

  if (!shouldShow) {
    return null;
  }

  return (
    <div className={styles.navbarLanguageSwitchContainer}>
      <div className={styles.languageButtons}>
        <button
          className={`${styles.languageButton} ${styles.navbarButton} ${currentLanguage === 'en' ? styles.active : ''}`}
          onClick={() => switchLanguage('en')}
          aria-label="Switch to English"
          title="Switch to English"
        >
          ENG
        </button>
        <button
          className={`${styles.languageButton} ${styles.navbarButton} ${currentLanguage === 'ur' ? styles.active : ''}`}
          onClick={() => switchLanguage('ur')}
          aria-label="Switch to Urdu"
          title="Switch to Urdu"
        >
          اردو
        </button>
      </div>
    </div>
  );
};

export default NavbarLanguageSwitch;