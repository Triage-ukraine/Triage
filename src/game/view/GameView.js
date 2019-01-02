import Clock from 'game/Clock';
import Ambulance from 'game/data/Ambulance';
import Person from 'game/data/Person';
import generateId from 'game/generateId';
import AmbulanceRowView from 'game/view/AmbulanceRowView';
import DraggablePersonCardListView from 'game/view/DraggablePersonCardListView';
import PropTypes from 'prop-types';
import React from "react";

// TODO move Tool to separate file, and pass array of tools from App to this view.
class Tool {

    constructor({id = generateId(), name}) {
        this._id = id;
        this._name = name;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }
}

class GameView extends React.PureComponent {

    static propTypes = {
        peopleArray: PropTypes.arrayOf(
            PropTypes.instanceOf(Person)
        ).isRequired,

        ambulanceArray: PropTypes.arrayOf(
            PropTypes.instanceOf(Ambulance)
        ).isRequired,

        hospitalDistance: PropTypes.number.isRequired,

        clock: PropTypes.instanceOf(Clock).isRequired,

        /**
         * @param {function} ({personId, injuryId, toolId})
         */
        onInjuryTreat: PropTypes.func.isRequired,

        onPersonMoveStart: PropTypes.func.isRequired,

        /**
         * @param {function} ({fromIndex, toIndex})
         */
        onPersonMoveEnd: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedTool: null,
        };

        this.tools = [
            new Tool({name: "Bandage"})
        ];
    }

    onToolClick = ({id}) => {
        const newVal = this.state.selectedTool != null ? null : id;

        this.setState({
            selectedTool: newVal
        })
    };

    onInjuryClick = ({personId, injuryId}) => {
        if (this.state.selectedTool) {
            this.props.onInjuryTreat({
                personId: personId,
                injuryId: injuryId,
                toolId: this.state.selectedTool
            });
            this.setState({
                selectedTool: null
            });
        }
    };

    onClockMultiplierChange({value}) {
        // TODO should be implemented other way
        this.props.clock.multiplier = +value;
    }

    render() {

        const {peopleArray, ambulanceArray, hospitalDistance, clock, onPersonMoveStart, onPersonMoveEnd} = this.props;

        return (
            <div>
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
                <div>
                    <div className="toolContainer">
                        {
                            this.tools.map((tool) => {
                                const className = "tool" + (this.state.selectedTool === tool.id ? " selected" : "");
                                return <div key={tool.id}
                                            className={className}
                                            onClick={() => {
                                                this.onToolClick({id: tool.id})
                                            }}
                                >{tool.name}</div>;
                            })
                        }
                    </div>

                    <DraggablePersonCardListView peopleArray={peopleArray}
                                                 onPersonMoveStart={onPersonMoveStart}
                                                 onPersonMoveEnd={onPersonMoveEnd}
                                                 onInjuryClick={this.onInjuryClick}/>

                </div>
            </div>
        );
    }

}

export default GameView;