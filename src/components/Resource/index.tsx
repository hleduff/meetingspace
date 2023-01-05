import { useGetResourceQuery } from '../../features/api/apiSlice';

import styles from './style.module.css';

// displays the available room
export const Resource = () => {
    const { data: resource } = useGetResourceQuery();

    return (
        <p className={styles.root}>
            Current room: <b className="highlight">{resource?.data.name}</b>
        </p>
    );
};
