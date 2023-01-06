import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useState } from 'react';

import { useCreateBookingMutation, useGetResourceQuery, useGetUserQuery } from '../../features/api/apiSlice';
import { checkDuration } from '../../utils';

import styles from './style.module.css';

export const Resource = ({ currentUser }: { currentUser?: string | null }) => {
    const [duration, setDuration] = useState(0);
    const [name, setName] = useState('');

    const { data: resource } = useGetResourceQuery();
    const [createBooking, { isLoading: creatingBooking }] = useCreateBookingMutation();
    const { data: user } = useGetUserQuery(currentUser ?? skipToken);

    const durationStep = resource?.data.bookingDurationStep as number;
    const maxDuration = resource?.data.maximumBookingDuration as number;
    const minDuration = resource?.data.minimumBookingDuration as number;

    const isDurationValid = (value: number): boolean => {
        return checkDuration(durationStep, maxDuration, minDuration, value);
    };

    const handleSubmit = async () => {
        if (creatingBooking) return;
        if (isDurationValid(duration) && name) {
            try {
                await createBooking({ duration, name }).unwrap();
            } catch (err) {
                console.error('Booking failed: ', err);
            }
        }
    };

    const handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dur = parseInt(e.target.value);
        setDuration(dur);
    };

    let content;

    if (user) {
        content = <p>
            <b className="highlight">{resource?.data.name}</b> is currently booked by <b className="highlight">{user.data.name}</b>.
        </p>
    } else {
        content = <>
            <p>
                Book the <b className="highlight">{resource?.data.name}</b> room:
            </p>
            <div className={styles.form}>
                <div className={styles.formLine}>
                    <label className={styles.label} htmlFor="duration">Duration:</label>
                    <input
                        disabled={!!user}
                        id="duration"
                        max={maxDuration}
                        min={minDuration}
                        name="duration"
                        onChange={handleChangeDuration}
                        step={durationStep}
                        type="number"
                        value={duration}
                    /> mins
                </div>
                <div className={styles.formLine}>
                    <label className={styles.label} htmlFor="name">Meeting name:</label>
                    <input
                        disabled={!!user}
                        id="name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                    />
                </div>
                <div className={styles.formLine}>
                    <button type="button" disabled={!!user || creatingBooking} onClick={handleSubmit}>
                        Book
                    </button>
                </div>
            </div>
        </>
    }

    return (
        <div className={styles.resource}>
            {content}
        </div>
    );
};
