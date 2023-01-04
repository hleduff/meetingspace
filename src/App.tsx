import { useAppSelector } from './app/store';
import { Dashboard, Layout } from './components';

import './App.css';

const App = () => {
    const authToken = useAppSelector((state) => state.auth.token);

    let content;

    if (authToken) content = <Dashboard />
    else content = (
        <p className="regText">You must be logged in to use this app!<br />
        Please click on the button at the top right of this screen.</p>
    );

    return (
        <Layout>
            {content}
        </Layout>
    );
};

export default App;
