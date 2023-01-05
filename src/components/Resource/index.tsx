import { useGetResourceQuery } from '../../features/api/apiSlice';

// displays the available room
export const Resource = () => {
    const { data: resource } = useGetResourceQuery();

    return (
        <p className="regText">
            You're currently availability for room:&nbsp;
            <b className="highlight">{resource?.data.name}</b>
        </p>
    );
};
