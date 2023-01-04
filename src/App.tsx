import { useAppSelector } from './app/store';
import { Dashboard, Layout } from './components';

const App = () => {
    const authToken = useAppSelector((state) => state.auth.token);

    return (
        <Layout>
            {authToken && <Dashboard />}
        </Layout>
    );
};

export default App;
