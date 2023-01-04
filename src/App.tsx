import { useAuthToken } from './app/hooks';
import { Dashboard, Login } from './views';

const App = () => {
    const authToken = useAuthToken();

    return (
        authToken ? <Dashboard /> : <Login />
    )
};

export default App;
