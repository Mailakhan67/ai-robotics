import React from 'react';
import NavbarAuthComponent from '../../components/Auth/NavbarAuthComponent';

interface NavbarItemAuthProps {
  [key: string]: any;
}

export default function NavbarItemAuth(props: NavbarItemAuthProps): JSX.Element {
  return <NavbarAuthComponent {...props} />;
}