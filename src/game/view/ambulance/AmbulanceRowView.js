import React from "react";
import PropTypes from 'prop-types';

class AmbulanceRowView extends React.PureComponent {

    static propTypes = {
        ambulanceDistance: PropTypes.number.isRequired,
        hospitalDistance: PropTypes.number.isRequired,
        full: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const color = this.props.full ? "orange" : "green";
        const ambulanceDistance = this.props.ambulanceDistance;
        const hospitalDistance = this.props.hospitalDistance;

        const distancePercent = Math.min(Math.max(ambulanceDistance *  100 / hospitalDistance, 0), 100);

        return (
            <div className="ambulanceRow">
                <div className="ambulanceCar" style={{marginLeft: distancePercent + "%", backgroundColor: color}}/>
            </div>
        );
    }

}

export default AmbulanceRowView;