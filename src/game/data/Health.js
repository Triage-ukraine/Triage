/**
 * Holds current person vital signs.
 */
class Health {

    /**
     *
     * @param respiratoryRate {Number}  - normal (>=10 && <30), fast (>=30)
     * @param stridor {Boolean}
     * @param hemoptysis {Boolean}
     * @param cyanosis {Boolean}
     * @param position {String} lying, standing
     * @param airway {String} ok, threat, blocked
     * @param heartRate {Number} 50-100, <50
     * @param systolicBloodPressure {Number} < 50, >=90
     */
    constructor({respiratoryRate, stridor, hemoptysis, cyanosis, position, airway, heartRate, systolicBloodPressure}) {
        this._respiratoryRate = respiratoryRate;
        this._stridor = stridor;
        this._hemoptysis = hemoptysis;
        this._cyanosis = cyanosis;
        this._position = position;
        this._airway = airway;
        this._heartRate = heartRate;
        this._systolicBloodPressure = systolicBloodPressure;
    }

    get respiratoryRate() {
        return this._respiratoryRate;
    }

    set respiratoryRate(value) {
        this._respiratoryRate = value;
    }

    get stridor() {
        return this._stridor;
    }

    set stridor(value) {
        this._stridor = value;
    }

    get hemoptysis() {
        return this._hemoptysis;
    }

    set hemoptysis(value) {
        this._hemoptysis = value;
    }

    get cyanosis() {
        return this._cyanosis;
    }

    set cyanosis(value) {
        this._cyanosis = value;
    }

    get position() {
        return this._position;
    }

    set position(value) {
        this._position = value;
    }

    get airway() {
        return this._airway;
    }

    set airway(value) {
        this._airway = value;
    }

    get heartRate() {
        return this._heartRate;
    }

    set heartRate(value) {
        this._heartRate = value;
    }

    get systolicBloodPressure() {
        return this._systolicBloodPressure;
    }

    set systolicBloodPressure(value) {
        this._systolicBloodPressure = value;
    }
}

export default Health;