import React from "react";
import PropTypes from 'prop-types';

import Person from 'game/data/Person';
import Injury from 'game/data/Injury';
import Health from 'game/data/Health';

class PersonCardView extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Person {this.props.id}</div>
        );
    }

}

export default PersonCardView;