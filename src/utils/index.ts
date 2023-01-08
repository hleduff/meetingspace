export const localTime = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const checkDuration = (duration: number, max: number, min: number, value: number): boolean => {
    if ([
        typeof value === 'number' && value > 0,
        value >= min && value <= max,
        value % duration === 0,
    ].every(Boolean)) return true;

    return false;
};
