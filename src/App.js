import Clock from 'game/Clock';
import Ambulance from 'game/data/Ambulance';
import generateId from 'game/generateId';
import generatePeople from 'game/generatePeople';
import simulateHealth from 'game/simulation/simulateHealth';
import AmbulanceRowView from 'game/view/AmbulanceRowView';
import PersonCardView from 'game/view/PersonCardView';
import React from "react";
import ReactDOM from "react-dom";
import 'style.css';

const Cards = ({peopleArray, ambulanceArray, hospitalDistance, clock}) => {
    return (
        <div>
            <div>{clock.formatTime()}</div>

            <div>
                {
                    ambulanceArray.map((ambulance) => {
                        return <AmbulanceRowView key={ambulance.id}
                                                 full={ambulance.full}
                                                 ambulanceDistance={ambulance.distance}
                                                 hospitalDistance={hospitalDistance}/>
                    })
                }
            </div>

            <div className="cardContainer">
                {
                    peopleArray.map((person) => {
                        return <PersonCardView key={person.id}
                                               id={person.id}
                                               age={person.age}
                                               gender={person.gender}
                                               health={person.health}
                                               injuries={person.injuries}/>
                    })
                }
            </div>
        </div>
    );
};

document.addEventListener("DOMContentLoaded", function () {

    const clock = new Clock({});

    const peopleArray = generatePeople();

    const hospitalDistance = 2000;

    const ambulanceArray = [new Ambulance({id: generateId(), distance: hospitalDistance})];

    let t0 = clock.getTime();

    // Main loop
    setInterval(function () {
        const t1 = clock.getTime();
        const dT = t1 - t0;

        simulateHealth({dT, peopleArray, ambulanceArray, hospitalDistance});

        t0 = t1;

        ReactDOM.render(<Cards clock={clock} peopleArray={peopleArray} ambulanceArray={ambulanceArray} hospitalDistance={hospitalDistance}/>, document.getElementById("game"));
    }, 1000);

    window.setTimeMultiplier = function(val) {
        clock.multiplier = val;
    }
});

