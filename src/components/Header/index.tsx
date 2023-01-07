import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/store';
import { useGetMeMutation, useLoginMutation, useLogoutMutation, useResetEnvironmentMutation } from '../../features/api/apiSlice';
import { setAuth } from '../../features/auth/authSlice';
import { resetResource } from '../../features/resource/resourceSlice';
import { setUser } from '../../features/user/userSlice';

import styles from './style.module.css';

export const Header = () => {
    const dispatch = useDispatch();

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

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                meeting<span className="highlight">space</span>
            </h1>
            <div className={styles.menu}>
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
                    <>
                        <div className={styles.user}>
                            {userName}
                        </div>
                        <button
                            className="btn"
                            disabled={logoutLoading}
                            onClick={handleLogout}
                            type="button"
                        >
                            Logout
                        </button>
                    </>
                )}
                <button
                    className="btn"
                    onClick={handleReset}
                    type="button"
                >
                    Reset
                </button>
            </div>
        </header>
    );
};
