/**
 * title component
 * TODO: add @htmlTag param to choose which hX tag we need
 * TODO: add @cssClass param to choose which style we want ("lvl1-title", "lvl2-title", etc.)
 */

import { ReactNode } from 'react';
import styles from './style.module.css';

export const Title = ({ children }: { children: ReactNode }) => (
    <h2 className={styles.title}>{children}</h2>
);
