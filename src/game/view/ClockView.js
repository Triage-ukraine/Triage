import Clock from "game/Clock";
import PropTypes from "prop-types";
import React from "react";

class ClockView extends React.Component {

    static propTypes = {
        clock: PropTypes.instanceOf(Clock).isRequired,
    };

    onClockMultiplierChange({value}) {
        // TODO should be implemented other way
        this.props.clock.multiplier = +value;
    }

    render() {
        const {clock} = this.props;

        return (
            <div>{clock.formatTime()} X
                <input type="number"
                       style={{
                           width: "30px"
                       }}
                       value={clock.multiplier}
                       onChange={(e) => {
                           this.onClockMultiplierChange({value: e.target.value});
                       }}/>
            </div>
        );
    }
}

export default ClockView;