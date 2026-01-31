/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next';

import config from '@payload-config';
import { RootLayout } from '@payloadcms/next/layouts';
import React from 'react';

// Import Payload CSS
import '@payloadcms/next/css';

// Import custom admin styles if needed
import './custom.scss';

type Args = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Techno Groop Admin',
  description: 'Content Management System',
};

const Layout = ({ children }: Args) => <RootLayout config={config}>{children}</RootLayout>;

export default Layout;
