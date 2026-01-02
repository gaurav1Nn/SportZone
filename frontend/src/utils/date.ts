// Simple date formatting utility
export const format = (date: Date, formatStr: string): string => {
    const options: Intl.DateTimeFormatOptions = {};

    if (formatStr.includes('PPp')) {
        // Full date and time
        options.dateStyle = 'medium';
        options.timeStyle = 'short';
    } else if (formatStr.includes('PP')) {
        // Full date
        options.dateStyle = 'medium';
    } else if (formatStr.includes('p')) {
        // Time only
        options.timeStyle = 'short';
    }

    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const formatRelative = (date: Date): string => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));

    if (diffMinutes < 0) {
        return 'Past';
    } else if (diffMinutes < 60) {
        return `In ${diffMinutes} min`;
    } else if (diffHours < 24) {
        return `In ${diffHours} hours`;
    } else if (diffDays < 7) {
        return `In ${diffDays} days`;
    } else {
        return format(date, 'PP');
    }
};
