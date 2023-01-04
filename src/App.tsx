import { useAppSelector } from './app/store';
import { Dashboard, Layout } from './components';

import './App.css';

const App = () => {
    const authToken = useAppSelector((state) => state.auth.token);
    const userName = useAppSelector((state) => state.user.name) || '';

    let content;

    if (authToken) content = <Dashboard name={userName} />
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
