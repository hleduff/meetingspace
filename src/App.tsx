import { useAppSelector } from './app/store';
import { Dashboard, Layout } from './components';

const App = () => {
    const authToken = useAppSelector((state) => state.auth.token);
    const userName = useAppSelector((state) => state.user.name) || '';

    return (
        <Layout>
            {authToken && <Dashboard name={userName} />}
        </Layout>
    );
};

export default App;
