import React from 'react';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import NavbarItemAuth from './NavbarItemAuth';

// Docusaurus expects this to be a component that renders different navbar items
// based on the type prop
function getNavbarComponent(type: string) {
  switch (type) {
    case 'custom-auth':
      return NavbarItemAuth;
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