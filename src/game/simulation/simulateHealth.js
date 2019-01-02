import Ambulance from 'game/data/Ambulance';
import Person from 'game/data/Person';

/**
 * @param dT {Number} milliseconds
 * @param peopleArray {Array<Person>}
 * @param ambulanceArray {Array<Ambulance>}
 * @param hospitalDistance {Number} meters
 */
function simulateHealth({dT, peopleArray, ambulanceArray, hospitalDistance}) {
    dT = dT / 1000; // to seconds

    if (dT === 0) {
        return;
    }

    const ambulanceSpeed = 20; // m/sec

    ambulanceArray.forEach((ambulance) => {
        if (ambulance.full) {
            const fullDistance = ambulance.distance + dT * ambulanceSpeed;

            if (fullDistance >= hospitalDistance) {
                ambulance.full = false;
                ambulance.distance = hospitalDistance - (fullDistance % hospitalDistance);
            } else {
                ambulance.distance = fullDistance;
            }
        } else {
            if (peopleArray.length === 0) {
                return;
            }
            const fullDistance = ambulance.distance - dT * ambulanceSpeed;

            if (fullDistance <= 0) {

                peopleArray.shift();

                ambulance.full = true;
                ambulance.distance = Math.abs(fullDistance);
            } else {
                ambulance.distance = fullDistance;
            }
        }
    });

    peopleArray.forEach((person) => {
        if (!person.injuries) {
            return;
        }

        const health = person.health.copy();

        person.injuries.forEach((injury) => {
            if (!injury.effects) {
                return;
            }
            injury.effects.forEach((effect) => {
                effect.apply({health, dT});
            });
        });

        person.health = health;
    });
}

export default simulateHealth;