import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/store';
import { useCancelBookingMutation, useGetUserQuery } from '../../features/api/apiSlice';
import { resetResource, setCurrentMeeting, setNextMeeting } from '../../features/resource/resourceSlice';
import { IBooking, IBookingRequest } from '../../types';
import { localTime } from '../../utils';

import styles from './style.module.css';

export const Booking = ({ booking } : { booking: IBooking }) => {
    const dispatch = useDispatch();
    const { data: bookingOwner } = useGetUserQuery(booking.userId);
    const [cancelBooking, { isLoading }] = useCancelBookingMutation();

    const loggedInUser = useAppSelector((state) => state.user.id);
    const currentMeeting = useAppSelector((state) => state.resource.currentMeeting);
    const resourceData = useAppSelector((state) => state.resource.resourceData);

    const inProgress = typeof currentMeeting.userId === 'string' && currentMeeting.userId === bookingOwner?.data.id;

    const handleClick = async (id: string) => {
        try {
            await cancelBooking(id);
            dispatch(resetResource());
        } catch (err) {
            console.error(err);
        }
    };

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
        <div className={styles.footer}>
            <p className={styles.user}>{bookingOwner?.data?.name}</p>
            {loggedInUser === booking.userId && (
                <button
                    className="btn warning"
                    type="button"
                    onClick={() => handleClick(booking.id)}
                    disabled={isLoading}
                >
                    Cancel
                </button>
            )}
        </div>
    </div>);

    return content;
};
