import Clock from 'game/Clock';
import Ambulance from 'game/data/Ambulance';
import Person from 'game/data/Person';
import generateId from 'game/generateId';
import AmbulanceRowView from 'game/view/AmbulanceRowView';
import PersonCardView from 'game/view/PersonCardView';
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

class GameView extends React.Component {

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
        onInjuryTreat: PropTypes.func.isRequired
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

    onToolClick({id}) {
        const newVal = this.state.selectedTool != null ? null : id;

        this.setState({
            selectedTool: newVal
        })
    }

    onInjuryClick({personId, injuryId}) {
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
    }

    onClockMultiplierChange({value}) {
        // TODO should be implemented other way
        this.props.clock.multiplier = +value;
    }

    render() {

        const {peopleArray, ambulanceArray, hospitalDistance, clock} = this.props;

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
                    <div className="cardContainer">
                        {
                            peopleArray.map((person) => {
                                return <PersonCardView key={person.id}
                                                       id={person.id}
                                                       age={person.age}
                                                       gender={person.gender}
                                                       health={person.health}
                                                       injuries={person.injuries}
                                                       onInjuryClick={({id}) => {
                                                           this.onInjuryClick({
                                                               personId: person.id,
                                                               injuryId: id,
                                                           });
                                                       }}/>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default GameView;