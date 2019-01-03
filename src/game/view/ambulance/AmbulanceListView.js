import Ambulance from "game/data/Ambulance";
import AmbulanceRowView from "game/view/ambulance/AmbulanceRowView";
import PropTypes from "prop-types";
import React from "react";

class AmbulanceListView extends React.Component {
    static propTypes = {
        ambulanceArray: PropTypes.arrayOf(
            PropTypes.instanceOf(Ambulance)
        ).isRequired,

        hospitalDistance: PropTypes.number.isRequired,
    };

    render() {
        const {ambulanceArray, hospitalDistance} = this.props;

        return (
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
        );
    }
}

export default AmbulanceListView;