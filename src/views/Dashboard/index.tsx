import { useGetMeQuery } from '../../app/hooks';
import { Layout } from '../../components';

export const Dashboard = () => {
    const userData = useGetMeQuery();

    console.log(userData);

    return (
        <div>
            <Layout>
                Dashboard
            </Layout>
        </div>
    );
};
