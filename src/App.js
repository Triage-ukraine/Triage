import 'style.css';
import React from "react";
import ReactDOM from "react-dom";

import generatePeople from 'game/generatePeople';
import Clock from 'game/Clock';
import simulateHealth from 'game/simulation/simulateHealth';

import PersonCardView from 'game/view/PersonCardView';

const Cards = ({peopleArray, clock}) => {
    return (
        <div>
            <div>{clock.formatTime()}</div>
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


    let t0 = clock.getTime();

    // Main loop
    setInterval(function () {
        const t1 = clock.getTime();
        const dT = t1 - t0;

        simulateHealth({dT, peopleArray});

        t0 = t1;

        ReactDOM.render(<Cards clock={clock} peopleArray={peopleArray}/>, document.getElementById("game"));
    }, 1000);
});

