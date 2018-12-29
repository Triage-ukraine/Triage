import Effect from 'game/data/Effect';

/**
 * Broken bones, cuts, punctures, bruises etc.
 * Anything, that somehow affects person health.
 * TODO should have more fields (body part), to be able to visualize on the body.
 */
class Injury {

    /**
     * @param id {Number}
     * @param effects {Array<Effect>}
     */
    constructor({id, effects}) {
        this._id = id;
        this._effects = effects;
    }

    get id() {
        return this._id;
    }

    get effects() {
        return this._effects;
    }
}

export default Injury;