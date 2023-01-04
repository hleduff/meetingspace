import { Greet } from '../Greet';

export const Dashboard = ({ name = '' as string }) => (
    <div>
        <Greet name={name} />
    </div>
);
