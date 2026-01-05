import React from 'react';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import NavbarItemAuth from './NavbarItemAuth';
import NavbarLanguageSwitch from '@site/src/components/LanguageSwitch/NavbarLanguageSwitch';

// Docusaurus expects this to be a component that renders different navbar items
// based on the type prop
function getNavbarComponent(type: string) {
  switch (type) {
    case 'custom-auth':
      return NavbarItemAuth;
    case 'custom-navbar-language-switch':
      return NavbarLanguageSwitch;
    default:
      return DefaultNavbarItem;
  }
}

interface NavbarItemProps {
  type?: string;
  [key: string]: any;
}

export default function NavbarItem({ type, ...props }: NavbarItemProps): JSX.Element {
  const Component = getNavbarComponent(type || 'default');
  return <Component type={type} {...props} />;
}