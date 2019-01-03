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
        age: PropTypes.number.isRequired,

        /**
         * @param {function} ({id})
         */
        onInjuryClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {injuries, onInjuryClick} = this.props;

        return (
            <div className="card">
                <div>Gender: {this.props.gender}</div>
                <div>Age: {this.props.age}</div>
                <div>Blood pressure: {this.props.health.systolicBloodPressure.toFixed(0)}</div>
                <div>
                    {
                        injuries.map((injury) => {
                            const treated = injury.effects.length === 0;

                            const style = {
                                border: "1px solid black",
                                color: treated ? "gray" : "black"
                            };

                            if (!treated) {
                                style.cursor = "pointer";
                            }

                            return (
                                <div key={injury.id} style={style} onClick={() => {
                                    if (treated) {
                                        return;
                                    }
                                    onInjuryClick({id: injury.id});
                                }}>Injury</div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }

}

export default PersonCardView;