import Health from 'game/data/Health';

/**
 * Interface for health effect.
 * Can be applied once or constantly.
 */
class Effect {

    /**
     * TODO should have more props, like passed time, may be some state inside health, to be able to simulate changes through time
     * @param health {Health}
     * @param dT {Number} time passed since last simulation in seconds
     */
    apply({health, dT}) {
        throw new Error('Method should be implemented');
    }
}

export default Effect