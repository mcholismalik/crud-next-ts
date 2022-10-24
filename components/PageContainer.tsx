import { Container } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { AuthDialog } from './auth/AuthDialog';

interface IPage {
  title: string;
  children: React.ReactNode;
}

export const PageContainer = ({ title, children }: IPage) => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
      <AuthDialog></AuthDialog>
    </Container>
  );
};
