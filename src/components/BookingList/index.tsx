import { useGetBookingsQuery } from '../../features/api/apiSlice';
import { IBooking } from '../../types';
import { Booking } from '../Booking';

import styles from './style.module.css';

// displays the available room
export const BookingList = () => {
    const { data: bookings, isLoading } = useGetBookingsQuery();

    let content;

    if (isLoading) content = "Loading bookings…";
    else if (bookings) content = bookings.data.map((booking: IBooking) => <Booking key={booking.id} booking={booking} />);

    return <div className={styles.root}>{content}</div>;
};
