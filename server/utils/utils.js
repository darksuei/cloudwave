const formatDateLabel = (date) => {
    const currentDate = new Date();
    const providedDate = new Date(date);

    const timeDifference = currentDate - providedDate;
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (timeDifference < oneDayInMilliseconds) {
        if (timeDifference < 60 * 1000) {
            return 'Just now';
        } else if (timeDifference < 2 * 60 * 1000) {
            return 'A minute ago';
        } else if (timeDifference < 60 * 60 * 1000) {
            return Math.floor(timeDifference / (60 * 1000)) + ' minutes ago';
        } else if (timeDifference < 2 * 60 * 60 * 1000) {
            return 'An hour ago';
        } else {
            return Math.floor(timeDifference / (60 * 60 * 1000)) + ' hours ago';
        }
    } else if (timeDifference < 2 * oneDayInMilliseconds) {
        return 'yesterday';
    } else {
        return providedDate.toDateString();
    }
}
module.exports = {formatDateLabel};
