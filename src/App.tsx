import { useAppSelector } from './app/store';
import { Dashboard, Layout, Text } from './components';

const App = () => {
    const authToken = useAppSelector((state) => state.auth.token);

    let content;

    if (authToken) content = <Dashboard />;
    else content = (
        <>
            <Text>You must be logged in to use this app!</Text>
            <Text>Please click on the button at the top right of this screen.</Text>
        </>
    );

    return (
        <Layout>
            {content}
        </Layout>
    );
};

export default App;
