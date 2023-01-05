export const localTime = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
};
