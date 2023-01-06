import { useGetUserQuery } from '../../features/api/apiSlice';
import { IBooking } from '../../types/types';
import { localTime } from '../../utils/utils';

import styles from './style.module.css';

export const Booking = ({ booking } : { booking: IBooking }) => {
    const { data: user } = useGetUserQuery(booking.userId);
    const timeNow = new Date().getTime();
    const isOccupied = timeNow >= new Date(booking.start).getTime()
                        && timeNow <= new Date(booking.end).getTime();

    let content = null;

    if (booking) content = (<div className={styles.root}>
        <div className={styles.header}>
            <p className={styles.time}><b>{localTime(booking.start)} - {localTime(booking.end)}</b></p>
            {isOccupied && <span className={styles.busy}>In progress</span>}
        </div>
        <p>{booking.name}</p>
        <p className={styles.user}>{user?.data?.name}</p>
    </div>);

    return content;
};
