import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/store';
import { useGetUserQuery } from '../../features/api/apiSlice';
import { setCurrentMeeting, setNextMeeting } from '../../features/resource/resourceSlice';
import { IBooking } from '../../types';
import { localTime } from '../../utils';

import styles from './style.module.css';

export const Booking = ({ booking } : { booking: IBooking }) => {
    const dispatch = useDispatch();
    const { data: user } = useGetUserQuery(booking.userId);

    const currentMeeting = useAppSelector((state) => state.resource.currentMeeting);
    const resourceData = useAppSelector((state) => state.resource.resourceData);

    const inProgress = typeof currentMeeting.userId === 'string' && currentMeeting.userId === user?.data.id;

    useEffect(() => {
        const bookingEnd = new Date(booking.end).getTime();
        const bookingStart = new Date(booking.start).getTime();
        const currentTime = new Date().getTime();

        // look for a meeting in progress
        if (currentTime >= bookingStart && currentTime <= bookingEnd) {
            dispatch(setCurrentMeeting({ userId: booking.userId }));
        // then among the other meetings… 
        } else if (currentTime < bookingEnd) {
            // … look for a meeting starting in less than maxDuration time
            const timeToNextMeeting = Math.floor((bookingStart - currentTime) / (1000 * 60));
            if (timeToNextMeeting <= resourceData.maxDuration) {
                dispatch(setNextMeeting({ timeRemaining: timeToNextMeeting }));
            }
        }
    }, [booking]);

    let content = null;

    if (booking) content = (<div className={styles.booking}>
        <div className={styles.header}>
            <p className={styles.time}><b>{localTime(booking.start)} - {localTime(booking.end)}</b></p>
            {inProgress && <span className={styles.busy}>In progress</span>}
        </div>
        <p>{booking.name}</p>
        <p className={styles.user}>{user?.data?.name}</p>
    </div>);

    return content;
};
