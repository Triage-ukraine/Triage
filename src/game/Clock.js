class Clock {

    /**
     * @param delay {Number} millis
     */
    constructor({delay = 10}) {
        this.time = 0;

        const thisClass = this;
        this.interval = setInterval(function () {
            thisClass.time = thisClass.time + delay;
        }, delay);
    }

    /**
     * @return {number}
     */
    getTime() {
        return this.time;
    }

    /**
     * @return {String}
     */
    formatTime() {
        let totalSeconds = this.time / 1000;
        let totalMinutes = totalSeconds / 60;
        let hours = Math.floor(totalMinutes / 60);
        let minutes = Math.floor(totalMinutes % 60);
        let seconds = Math.floor(totalSeconds % 60);

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return `${hours}:${minutes}:${seconds}`;
    }

}

export default Clock