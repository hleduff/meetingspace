import { useState } from 'react';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';

import { useAppSelector } from '../../app/store';
import { useGetMeMutation, useLoginMutation, useLogoutMutation, useResetEnvironmentMutation } from '../../features/api/apiSlice';
import { setAuth } from '../../features/auth/authSlice';
import { resetResource } from '../../features/resource/resourceSlice';
import { setUser } from '../../features/user/userSlice';

import styles from './style.module.css';

export const Header = () => {
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);

    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const [getMe] = useGetMeMutation();
    const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
    const [reset] = useResetEnvironmentMutation();

    const authToken = useAppSelector((state) => state.auth.token);
    const userName = useAppSelector((state) => state.user.name);

    const handleLogin = async () => {
        try {
            const { data } = await login().unwrap();
            dispatch(setAuth(data));
            const { data: user } = await getMe().unwrap();
            dispatch(setUser(user));
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(resetResource());
        } catch (err) {
            console.error(err);
        }
    };

    const handleReset = async () => {
        try {
            await reset();
        } catch (err) {
            console.error(err);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                meeting<span className="highlight">space</span>
            </h1>
            <button
                aria-controls="siteMenu"
                aria-haspopup="true"
                aria-label="Toggle site menu"
                className={styles.menuButton}
                onClick={toggleMenu}
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path></svg>
            </button>
            <div
                aria-label="Site menu"
                className={classnames(styles.menuWrapper, menuOpen && styles.open)}
                id="siteMenu"
                tabIndex={-1}
                {...(menuOpen && {role: "dialog", "aria-modal" : "true"})}
            >
                <div className={styles.menuContainer}>
                    <div className={styles.menu}>
                        <div className={styles.menuHeader}>
                            {userName && (
                                <div className={styles.user}>
                                    {userName}
                                </div>
                            )}
                            <button
                                aria-label="Close"
                                className={styles.closeButton}
                                onClick={toggleMenu}
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"/><path fill="currentColor" fillRule="evenodd" d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0Z" clipRule="evenodd"/></svg>
                            </button>
                        </div>
                        {!authToken &&
                            <button
                                className="btn"
                                disabled={loginLoading}
                                onClick={handleLogin}
                                type="button"
                            >
                                Login
                            </button>
                        }
                        {userName && (
                            <button
                                className="btn"
                                disabled={logoutLoading}
                                onClick={handleLogout}
                                type="button"
                            >
                                Logout
                            </button>
                        )}
                        <button
                            className="btn"
                            onClick={handleReset}
                            type="button"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
