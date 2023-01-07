import { useGetBookingsQuery } from '../../features/api/apiSlice';
import { IBooking } from '../../types';
import { Booking, Resource, Title } from '../';

import styles from './style.module.css';

export const Dashboard = () => {
    const { data: bookings } = useGetBookingsQuery();

    return (
        <div className={styles.dashboard}>
            <Resource />
            <div>
                <Title>Schedule:</Title>
                <div className={styles.bookingsList}>
                    {bookings?.data.map((booking: IBooking) => <Booking key={booking.id} booking={booking} />)}
                </div>
            </div>
        </div>
    );
};
