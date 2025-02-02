class Utils {
    static getDate() {
        const options = {
            timeZone: 'America/Los_Angeles',
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };

        return new Date().toLocaleString('en-US', options);
    }
}

module.exports = Utils;