import 'style.css';
import React from "react";
import ReactDOM from "react-dom";

const Index = () => {
    return <div>Hello</div>;
};

document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(<Index />, document.getElementById("game"));
});

