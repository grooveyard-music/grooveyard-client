export const timeAgo = (timestamp: string): string => {
    const currentTime = new Date().getTime();
    const commentTime = new Date(timestamp).getTime();

    const differenceInMilliseconds = currentTime - commentTime;
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;

    if (differenceInMinutes < 60) {
        return `${Math.floor(differenceInMinutes)} minutes ago`;
    } else if (differenceInHours < 24) {
        return `${Math.floor(differenceInHours)} hours ago`;
    } else {
        return `${Math.floor(differenceInDays)} days ago`;
    }
};

