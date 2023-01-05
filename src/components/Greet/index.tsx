import { useAppSelector } from '../../app/store';

export const Greet = () => {
    const userName = useAppSelector((state) => state.user.name);

    return (
        <p className="regText">Hello {userName}!</p>
    );
};
