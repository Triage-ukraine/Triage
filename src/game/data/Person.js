import Injury from 'game/data/Injury';
import Health from 'game/data/Health';

class Person {

    /**
     * @param id {Number}
     * @param injuries {Array<Injury>}
     * @param health {Health}
     * @param gender {String}
     * @param age {Number}
     */
    constructor({id, injuries, health, gender, age}) {
        this._id = id;
        this._injuries = injuries;
        this._health = health;
        this._gender = gender;
        this._age = age;
    }

    get id() {
        return this._id;
    }

    get injuries() {
        return this._injuries;
    }

    get health() {
        return this._health;
    }

    get gender() {
        return this._gender;
    }

    get age() {
        return this._age;
    }
}

export default Person;