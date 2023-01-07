import { ReactNode } from 'react';

import styles from './style.module.css';

export const Text = ({ children }: { children: ReactNode }) => (
    <p className={styles.text}>{children}</p>
);
