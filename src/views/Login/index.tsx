import { Layout } from '../../components';
import { useLoginMutation } from '../../app/hooks';

export const Login = () => {
    const [login, { loading }] = useLoginMutation();

    const handleLogin = async () => {
        await login();
    };

    return (
        <Layout>
            <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
            >
                Login
            </button>
        </Layout>
    );
};
