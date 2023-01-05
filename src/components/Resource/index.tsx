import { useState } from 'react';
import { useCreateBookingMutation, useGetResourceQuery } from '../../features/api/apiSlice';
import { checkDuration } from '../../utils/utils';

import styles from './style.module.css';

// displays the available room
export const Resource = () => {
    const [duration, setDuration] = useState(0);
    const [name, setName] = useState('');
    const { data: resource } = useGetResourceQuery();
    const [createBooking, { isLoading }] = useCreateBookingMutation();

    const durationStep = resource?.data.bookingDurationStep as number;
    const maxDuration = resource?.data.maximumBookingDuration as number;
    const minDuration = resource?.data.minimumBookingDuration as number;

    const isDurationValid = (value: number): boolean => {
        return checkDuration(durationStep, maxDuration, minDuration, value);
    };

    const handleSubmit = async () => {

        if (isLoading) return;
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

    return (
        <div className={styles.root}>
            <p>Book the <b className="highlight">{resource?.data.name}</b> room</p>
            <div className={styles.form}>
                <div className={styles.formLine}>
                    <label className={styles.label} htmlFor="duration">Duration:</label>
                    <input
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
                    <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={styles.formLine}>
                    <button type="button" onClick={handleSubmit}>
                        Book
                    </button>
                </div>
            </div>
        </div>
    );
};
