import { ReactNode } from 'react';

import { Header } from '../Header';

import styles from './style.module.css';

export const Layout = ({ children }: { children: ReactNode }) => (
    <div className={styles.layout}>
        <Header />
        <main className={styles.main}>{children}</main>
    </div>
);
