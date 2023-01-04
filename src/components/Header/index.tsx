import { User } from '../User';

import styles from './style.module.css';

export const Header = () => (
    <header className={styles.header}>
        <h1 className={styles.title}>
            meeting<span className={styles.highlight}>space</span>
        </h1>
        <User />
    </header>
);
