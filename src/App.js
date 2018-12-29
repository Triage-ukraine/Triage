import 'style.css';
import React from "react";
import ReactDOM from "react-dom";

import generatePeople from 'game/generatePeople';
import Clock from 'game/Clock';

import PersonCardView from 'game/view/PersonCardView';

const Cards = ({peopleArray}) => {
    return (
        <div>
            {
                peopleArray.map((person)=> {
                    return <PersonCardView key={person.id} id={person.id}/>
                })
            }
        </div>
    );
};

document.addEventListener("DOMContentLoaded", function () {

    const clock = new Clock({});

    const peopleArray = generatePeople();


    // Main loop
    setInterval(function () {

        ReactDOM.render(<Cards peopleArray={peopleArray} />, document.getElementById("game"));
    }, 1000);
});

