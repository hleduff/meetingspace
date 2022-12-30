import PropTypes, { InferProps } from 'prop-types';

import { Header } from '../Header';

import styles from './style.module.css';

const LayoutPropTypes = {
    children: PropTypes.node,
};

export const Layout = ({ children }: InferProps<typeof LayoutPropTypes>) => (
    <div className={styles.root}>
        <Header />
        <main className={styles.main}>{children}</main>
    </div>
);
