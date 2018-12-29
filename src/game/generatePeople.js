import Person from 'game/data/Person';
import Injury from 'game/data/Injury';
import Health from 'game/data/Health';
import Effect from 'game/data/Effect';
import generateId from 'game/generateId';


class BloodLossEffect extends Effect {

    /**
     * @param lossRate {Number} loss per second
     */
    constructor({lossRate}) {
        super();
        this._lossRate = lossRate;
    }

    apply({health, dT}) {
        let bloodPressure = health.systolicBloodPressure;
        health.systolicBloodPressure = bloodPressure - (this.lossRate * dT);
    }

    get lossRate() {
        return this._lossRate;
    }
}

function generatePeople() {
    return [
        new Person({
            id: generateId(),
            injuries: [
                new Injury({
                    id: generateId(), 
                    effects: [
                        new BloodLossEffect({lossRate: 0.2})
                    ]
                })
            ],
            health: new Health({
                respiratoryRate: 20, 
                stridor: false, 
                hemoptysis: false, 
                cyanosis: false, 
                position: 'standing', 
                airway: 'ok', 
                heartRate: 65, 
                systolicBloodPressure: 45
            }), 
            gender: "female",
            age: "30"
        }),

        new Person({
            id: generateId(),
            injuries: [
                new Injury({
                    id: generateId(),
                    effects: [
                        new BloodLossEffect({lossRate: 0.8})
                    ]
                })
            ],
            health: new Health({
                respiratoryRate: 30,
                stridor: false,
                hemoptysis: false,
                cyanosis: false,
                position: 'lying',
                airway: 'ok',
                heartRate: 70,
                systolicBloodPressure: 60
            }),
            gender: "male",
            age: "46"
        })
    ];
}

export default generatePeople;