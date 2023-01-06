import { useEffect, useState } from 'react';

import { useGetBookingsQuery } from '../../features/api/apiSlice';
import { IBooking } from '../../types';
import { Booking, Resource, Title } from '../';

import styles from './style.module.css';

export const Dashboard = () => {
    const [currentUser, setCurrentUser] = useState<string | null>();
    const { data: bookings } = useGetBookingsQuery();

    const currentTime = new Date().getTime();

    useEffect(() => {
        if (bookings) {
            for (const booking of bookings.data) {
                if (currentTime >= new Date(booking.start).getTime() && currentTime <= new Date(booking.end).getTime()) {
                    setCurrentUser(booking.userId);
                }
            }
        }
    }, [currentTime]);

    return (
        <div className={styles.dashboard}>
            <Resource currentUser={currentUser} />
            <div>
                <Title>Schedule:</Title>
                <div className={styles.bookingsList}>
                    {bookings?.data.map((booking: IBooking) => <Booking key={booking.id} booking={booking} />)}
                </div>
            </div>
        </div>
    );
};
