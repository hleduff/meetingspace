import React from 'react';

import { Header } from '../Header';

import styles from './style.module.css';

export const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className={styles.root}>
        <Header />
        <main className={styles.main}>{children}</main>
    </div>
);
