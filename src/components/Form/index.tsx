import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '../../app/store';

import { useCreateBookingMutation } from '../../features/api/apiSlice';
import { checkDuration } from '../../utils';

import styles from './style.module.css';

export const Form = () => {
    const [bookingData, setBookingData] = useState({
        duration: 0,
        name: '',
    });
    const [createBooking, { isLoading: creatingBooking }] = useCreateBookingMutation();

    const { resourceData: {
        durationStep,
        maxDuration,
        minDuration
    },
        nextMeeting: { timeRemaining },    
    } = useAppSelector((state) => state.resource);

    const isDurationValid = (value: number): boolean => {
        return checkDuration(durationStep, maxDuration, minDuration, value);
    };

    const handleSubmit = async () => {
        if (creatingBooking) return;
        if (isDurationValid(bookingData.duration) && bookingData.name) {
            try {
                await createBooking(bookingData);
                setBookingData((prev) => ({
                    ...prev,
                    duration: 0,
                    name: '',
                }));
            } catch (err) {
                console.error('Booking failed: ', err);
            }
        }
    };

    const handleChangeDuration = (e: ChangeEvent<HTMLInputElement>) => {
        const dur = parseInt(e.target.value);
        setBookingData((prev) => ({
            ...prev,
            duration: dur,
        }));
    };

    return (
        <div className={styles.form}>
            <div className={styles.formLine}>
                <label className={styles.label} htmlFor="duration">Duration:</label>
                <input
                    id="duration"
                    max={timeRemaining ? timeRemaining : maxDuration}
                    min={minDuration}
                    name="duration"
                    onChange={handleChangeDuration}
                    step={durationStep}
                    type="number"
                    value={bookingData.duration}
                /> mins
            </div>
            <div className={styles.formLine}>
                <label className={styles.label} htmlFor="name">Meeting name:</label>
                <input
                    id="name"
                    name="name"
                    onChange={(e) => setBookingData((prev) => ({
                        ...prev,
                        name: e.target.value,
                    }))}
                    type="text"
                    value={bookingData.name}
                />
            </div>
            <div className={`${styles.formLine} ${styles.formLine}`}>
                <button type="button" disabled={creatingBooking} onClick={handleSubmit}>
                    Book
                </button>
            </div>
        </div>
    );
};
