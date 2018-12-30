import React from "react";
import PropTypes from 'prop-types';

import Person from 'game/data/Person';
import Injury from 'game/data/Injury';
import Health from 'game/data/Health';

class PersonCardView extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        injuries: PropTypes.arrayOf(
            PropTypes.instanceOf(Injury)
        ).isRequired,
        health: PropTypes.instanceOf(Health).isRequired,
        gender: PropTypes.oneOf(['male', 'female']).isRequired,
        age: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div>Person {this.props.id}</div>
                <div>BP: {this.props.health.systolicBloodPressure.toFixed(0)}</div>
            </div>
        );
    }

}

export default PersonCardView;