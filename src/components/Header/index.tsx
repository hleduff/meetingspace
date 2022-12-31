import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/store';
import { useGetMeMutation, useLoginMutation, useLogoutMutation } from '../../features/api/apiSlice';
import { setAuth } from '../../features/auth/authSlice';
import { setUser } from '../../features/user/userSlice';

import styles from './style.module.css';

export const Header = () => {
    const dispatch = useDispatch();
    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const [getMe] = useGetMeMutation();
    const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

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
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                meeting<span className={styles.highlight}>space</span>
            </h1>
            <div className={styles.user}>
                {!userName && 
                    <button
                        type="button"
                        onClick={handleLogin}
                        disabled={loginLoading}
                    >
                        Login
                    </button>
                }
                {userName && (
                    <>
                        <div className={styles.user}>
                            {userName}
                        </div>
                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={logoutLoading}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};
