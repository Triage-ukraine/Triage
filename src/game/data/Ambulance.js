class Ambulance {

    /**
     * @param id {Number}
     * @param distance {Number} initial distance from pickup point
     * @param full {Boolean} if full then can not pick up patients and drives to hospital.
     */
    constructor({id, distance, full = false}) {
        this._id = id;
        this._distance = distance;
        this._full = full;
    }

    get id() {
        return this._id;
    }

    get distance() {
        return this._distance;
    }

    set distance(value) {
        this._distance = value;
    }

    get full() {
        return this._full;
    }

    set full(value) {
        this._full = value;
    }
}

export default Ambulance;