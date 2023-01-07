import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppSelector } from '../../app/store';
import { useGetResourceQuery, useGetUserQuery } from '../../features/api/apiSlice';
import { setResourceData } from '../../features/resource/resourceSlice';
import { Form, Text, Title } from '../';

import styles from './style.module.css';

export const Resource = () => {
    const dispatch = useDispatch();
    const currentMeeting = useAppSelector((state) => state.resource.currentMeeting);

    const { data: resource } = useGetResourceQuery();
    const { data: user } = useGetUserQuery(currentMeeting?.userId ?? skipToken);

    useEffect(() => {
        if (resource) {
            dispatch(setResourceData({
                durationStep: resource?.data.bookingDurationStep,
                maxDuration: resource?.data.maximumBookingDuration,
                minDuration: resource?.data.minimumBookingDuration,
            }))
        }
    }, [resource]);

    let content;

    if (user) {
        content = <>
            <Title>
                <b className="highlight">{resource?.data.name}</b> is currently booked by <b className="highlight">{user.data.name}</b>. 
            </Title>
            <Text>You'll only be able to book the room once his meeting has ended.</Text>
        </>
    } else {
        content = <>
            <Title>
                Book the <b className="highlight">{resource?.data.name}</b> room:
            </Title>
            <Form />
        </>
    }

    return (
        <div className={styles.resource}>
            {content}
        </div>
    );
};
