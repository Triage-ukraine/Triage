class Clock {

    /**
     * @param delay {Number} millis
     * @param multiplier {Number} time multiplier in range [0;10]
     */
    constructor({delay = 10, multiplier = 1}) {
        this.time = 0;
        this.multiplier = multiplier;

        const thisClass = this;
        this.interval = setInterval(function () {
            thisClass.time = thisClass.time + (delay * thisClass.multiplier);
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


    get multiplier() {
        return this._multiplier;
    }

    set multiplier(value) {
        this._multiplier = Math.min(Math.max(value, 0), 10);
    }
}

export default Clock