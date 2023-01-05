import { useGetUserQuery } from '../../features/api/apiSlice';
import { IBooking } from '../../types/types';
import { localTime } from '../../util/utils';

import styles from './style.module.css';

export const Booking = ({ booking } : { booking: IBooking }) => {
    const { data: user } = useGetUserQuery(booking.userId);
    let content = null;

    if (booking) content = (<div className={styles.root}>
        <p>{booking.name}</p>
        <p>From: {localTime(booking.start)}</p>
        <p>To: {localTime(booking.end)}</p>
        <p>By: {user?.data?.name}</p>
    </div>);

    return content;
};
