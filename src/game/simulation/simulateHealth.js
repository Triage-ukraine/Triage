import Person from 'game/data/Person';
import Injury from 'game/data/Injury';
import Health from 'game/data/Health';
import Effect from 'game/data/Effect';

/**
 * @param dT {Number} milliseconds
 * @param peopleArray {Array<Person>}
 */
function simulateHealth({dT, peopleArray}) {
    dT = Math.floor(dT / 1000); // to seconds

    if (dT === 0) {
        return;
    }

    peopleArray.forEach((person) => {
        if (!person.injuries) {
            return;
        }

        const health = person.health.copy();

        person.injuries.forEach((injury)=> {
            if (!injury.effects) {
                return;
            }
            injury.effects.forEach((effect)=> {
                effect.apply({health, dT});
            });
        });

        person.health = health;
    });
}

export default simulateHealth;