import Clock from 'game/Clock';
import Ambulance from 'game/data/Ambulance';
import generateId from 'game/generateId';
import generatePeople from 'game/generatePeople';
import simulateHealth from 'game/simulation/simulateHealth';

import AmbulanceListView from 'game/view/ambulance/AmbulanceListView';
import ClockView from 'game/view/ClockView';
import InteractiveGameView from 'game/view/InteractiveGameView';
import React from "react";
import ReactDOM from "react-dom";
import 'style.css';

function treatPersonInjury({peopleArray, personId, injuryId, toolId}) {
    const person = peopleArray.find((person) => person.id === personId);

    if (!person) {
        return;
    }

    const injury = person.injuries.find((injury) => injury.id === injuryId);

    if (!injury) {
        return;
    }

    // TODO treating should consume time
    injury.treat();
}

function movePerson({peopleArray, fromIndex, toIndex}) {
    const person = peopleArray[fromIndex];

    peopleArray.splice(fromIndex, 1);
    peopleArray.splice(toIndex, 0, person);
}

document.addEventListener("DOMContentLoaded", function () {

    const clock = new Clock({multiplier: 2});

    let peopleArray = generatePeople();

    const hospitalDistance = 2000;

    const ambulanceArray = [new Ambulance({id: generateId(), distance: hospitalDistance})];

    let t0 = clock.getTime();

    const inputEvents = [];

    // Main loop
    setInterval(function () {
        const t1 = clock.getTime();
        const dT = t1 - t0;

        let inputEvent;
        while (inputEvent = inputEvents.shift()) {
            inputEvent();
        }

        simulateHealth({dT, peopleArray, ambulanceArray, hospitalDistance});

        peopleArray = peopleArray.slice();

        t0 = t1;

        ReactDOM.render(<ClockView clock={clock}/>, document.getElementById("clock"));

        ReactDOM.render(<AmbulanceListView ambulanceArray={ambulanceArray}
                                           hospitalDistance={hospitalDistance}/>, document.getElementById("ambulance"));

        ReactDOM.render(
            <InteractiveGameView peopleArray={peopleArray}
                                 onInjuryTreat={({personId, injuryId, toolId}) => {
                                     inputEvents.push(
                                         function () {
                                             treatPersonInjury({peopleArray, personId, injuryId, toolId});
                                         }
                                     );
                                 }}
                                 onPersonMoveEnd={({fromIndex, toIndex}) => {
                                     inputEvents.push(
                                         function () {
                                             movePerson({peopleArray, fromIndex, toIndex});
                                         }
                                     );
                                 }}/>,
            document.getElementById("interactive"),
        );

    }, 1000);

    window.setTimeMultiplier = function (val) {
        clock.multiplier = val;
    }
});

