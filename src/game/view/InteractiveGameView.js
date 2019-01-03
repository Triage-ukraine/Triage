import Person from 'game/data/Person';
import generateId from 'game/generateId';
import DraggablePersonCardListView from 'game/view/person/DraggablePersonCardListView';
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

class InteractiveGameView extends React.PureComponent {

    static propTypes = {
        peopleArray: PropTypes.arrayOf(
            PropTypes.instanceOf(Person)
        ).isRequired,

        /**
         * @param {function} ({personId, injuryId, toolId})
         */
        onInjuryTreat: PropTypes.func.isRequired,

        /**
         * @param {function} ({fromIndex, toIndex})
         */
        onPersonMoveEnd: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedTool: null,
            peopleArray: props.peopleArray
        };

        this.tools = [
            new Tool({name: "Bandage"})
        ];
    }

    componentWillReceiveProps({peopleArray}) {
        if (peopleArray !== this.state.peopleArray) {
            this.setState({
                ...this.state,
                peopleArray: peopleArray
            });
        }
    }

    onToolClick = ({id}) => {
        const newVal = this.state.selectedTool != null ? null : id;

        this.setState({
            ...this.state,
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
                ...this.state,
                selectedTool: null
            });
        }
    };

    onPersonMoveEnd = ({fromIndex, toIndex}) => {
        const person = this.state.peopleArray[fromIndex];

        const newArray = this.state.peopleArray.slice();

        newArray.splice(fromIndex, 1);
        newArray.splice(toIndex, 0, person);

        this.setState({
            ...this.state,
            peopleArray: newArray
        });

        this.props.onPersonMoveEnd({fromIndex, toIndex});
    };

    render() {
        return (
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

                <DraggablePersonCardListView peopleArray={this.state.peopleArray}
                                             onPersonMoveEnd={this.onPersonMoveEnd}
                                             onInjuryClick={this.onInjuryClick}/>
            </div>
        );
    }

}

export default InteractiveGameView;