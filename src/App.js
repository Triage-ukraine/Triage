import Clock from 'game/Clock';
import Ambulance from 'game/data/Ambulance';
import generateId from 'game/generateId';
import generatePeople from 'game/generatePeople';
import simulateHealth from 'game/simulation/simulateHealth';
import GameView from 'game/view/GameView';
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

    const peopleArray = generatePeople();

    const hospitalDistance = 2000;

    const ambulanceArray = [new Ambulance({id: generateId(), distance: hospitalDistance})];

    let t0 = clock.getTime();

    const inputEvents = [];

    let isMoving = false;

    // Main loop
    setInterval(function () {
        const t1 = clock.getTime();
        const dT = t1 - t0;

        const inputEvent = inputEvents.shift();
        if (inputEvent) {
            inputEvent();
        }

        simulateHealth({dT, peopleArray, ambulanceArray, hospitalDistance});

        t0 = t1;

        if (isMoving) {
            return;
        }

        // TODO split rendering of ambulances and cards
        ReactDOM.render(<GameView clock={clock}
                                  peopleArray={peopleArray}
                                  ambulanceArray={ambulanceArray}
                                  hospitalDistance={hospitalDistance}
                                  onInjuryTreat={({personId, injuryId, toolId}) => {
                                      inputEvents.push(
                                          function () {
                                              treatPersonInjury({peopleArray, personId, injuryId, toolId});
                                          }
                                      );
                                  }}
                                  onPersonMoveStart={() => isMoving = true}
                                  onPersonMoveEnd={({fromIndex, toIndex}) => {
                                      inputEvents.push(
                                          function () {
                                              movePerson({peopleArray, fromIndex, toIndex});
                                              isMoving = false;
                                          }
                                      );
                                  }}/>, document.getElementById("game"));
    }, 1000);

    window.setTimeMultiplier = function (val) {
        clock.multiplier = val;
    }
});

