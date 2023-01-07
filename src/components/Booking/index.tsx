import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/store';
import { useGetUserQuery } from '../../features/api/apiSlice';
import { setCurrentMeeting } from '../../features/resource/resourceSlice';
import { IBooking } from '../../types';
import { localTime } from '../../utils';

import styles from './style.module.css';

export const Booking = ({ booking } : { booking: IBooking }) => {
    const dispatch = useDispatch();
    const { data: user } = useGetUserQuery(booking.userId);

    const currentMeeting = useAppSelector((state) => state.resource.currentMeeting);
    const inProgress = typeof currentMeeting.userId === 'string' && currentMeeting.userId === user?.data.id;

    useEffect(() => {
        const currentTime = new Date().getTime();
        if (currentTime >= new Date(booking.start).getTime() && currentTime <= new Date(booking.end).getTime()) {
            dispatch(setCurrentMeeting({ userId: booking.userId }));
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
