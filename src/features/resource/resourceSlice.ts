import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const origState: {
    currentMeeting: {
        inProgress: boolean,
        userId: string | null,
    },
    resourceData: {
        durationStep: number,
        maxDuration: number,
        minDuration: number,
    },
    nextMeeting: {
        timeRemaining: number,
    },
} = {
    currentMeeting: {
        inProgress: false,
        userId: null,
    },
    resourceData: {
        durationStep: 0,
        maxDuration: 0,
        minDuration: 0, 
    },
    nextMeeting: {
        timeRemaining: 0,
    },
};

export const resourceSlice = createSlice({
    name: 'resource',
    initialState: origState,
    reducers: {
        resetResource: () => origState,
        setCurrentMeeting: (
            state,
            {
                payload: { userId },
            }: PayloadAction<{ userId: string; }>,
        ) => {
            state.currentMeeting.inProgress = true;
            state.currentMeeting.userId = userId;
        },
        setNextMeeting: (
            state,
            {
                payload: { timeRemaining },
            }: PayloadAction<{ timeRemaining: number }>,
        ) => {
            state.nextMeeting.timeRemaining = timeRemaining;
        },
        setResourceData: (
            state,
            {
                payload: { durationStep, maxDuration, minDuration },
            }: PayloadAction<{ durationStep: number; maxDuration: number; minDuration: number; }>,
        ) => {
            state.resourceData.durationStep = durationStep;
            state.resourceData.maxDuration = maxDuration;
            state.resourceData.minDuration = minDuration;
        },
    },
});

export const { resetResource, setCurrentMeeting, setNextMeeting, setResourceData } = resourceSlice.actions;

export default resourceSlice.reducer;
