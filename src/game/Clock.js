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

    getTime() {
        return this.time;
    }

}

export default Clock