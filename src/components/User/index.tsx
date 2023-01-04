import { makeVar, useReactiveVar } from '@apollo/client';

import { useLogoutMutation } from '../../app/hooks';

import styles from './style.module.css';

export const User = () => {
    const [logout, { loading: logoutLoading }] = useLogoutMutation();

    const handleLogout = async () => {
        await logout();
    };

    return (
        // user && (
            <div className={styles.user}>
                <div className={styles.user}>
                    {/* {user?.name} */}
                </div>
                <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutLoading}
                >
                    Logout
                </button>
            </div>
        // )
    );
};
