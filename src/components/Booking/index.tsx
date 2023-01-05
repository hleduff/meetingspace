import { useGetUserQuery } from '../../features/api/apiSlice';
import { IBooking } from '../../types/types';
import { localTime } from '../../utils/utils';

import styles from './style.module.css';

export const Booking = ({ booking } : { booking: IBooking }) => {
    const { data: user } = useGetUserQuery(booking.userId);
    let content = null;

    if (booking) content = (<div className={styles.root}>
        <p><b>{localTime(booking.start)} - {localTime(booking.end)}</b></p>
        <p>{booking.name}</p>
        <p className={styles.user}>{user?.data?.name}</p>
    </div>);

    return content;
};
