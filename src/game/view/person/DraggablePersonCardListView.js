import Person from 'game/data/Person';
import PersonCardView from 'game/view/person/PersonCardView';
import PropTypes from 'prop-types';
import React from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

class DraggablePersonCardListView extends React.PureComponent {

    static propTypes = {
        peopleArray: PropTypes.arrayOf(
            PropTypes.instanceOf(Person)
        ).isRequired,

        /**
         * @param {function} ({personId, injuryId})
         */
        onInjuryClick: PropTypes.func.isRequired,

        /**
         * @param {function} ({fromIndex, toIndex})
         */
        onPersonMoveEnd: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    /**
     * @param destination {Object}
     * @param destination.droppableId {Number}
     * @param destination.index {Number}
     * @param source {Object}
     * @param source.droppableId {Number}
     * @param source.index {Number}
     */
    onPersonDragEnd({destination, source}) {
        this.props.onPersonMoveEnd({
            fromIndex: source.index,
            toIndex: destination.index
        });
    }

    render() {
        return (
            <DragDropContext onDragEnd={(data) => this.onPersonDragEnd(data)}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {
                        (provided, snapshot) => {
                            return (
                                <div ref={provided.innerRef}
                                     style={{
                                         display: 'flex',
                                         padding: "5px",
                                         overflow: 'auto'
                                     }}
                                     {...provided.droppableProps}>

                                    {
                                        this.props.peopleArray.map((person, index) => {
                                            return <Draggable key={person.id} draggableId={person.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div ref={provided.innerRef}
                                                         {...provided.draggableProps}
                                                         {...provided.dragHandleProps}
                                                         style={{
                                                             userSelect: 'none',
                                                             margin: `0 5px 0 0`,
                                                             ...provided.draggableProps.style
                                                         }}>

                                                        <PersonCardView key={person.id}
                                                                        id={person.id}
                                                                        age={person.age}
                                                                        gender={person.gender}
                                                                        health={person.health}
                                                                        injuries={person.injuries}
                                                                        onInjuryClick={({id}) => {
                                                                            this.props.onInjuryClick({
                                                                                personId: person.id,
                                                                                injuryId: id,
                                                                            });
                                                                        }}/>
                                                    </div>
                                                )}
                                            </Draggable>
                                        })
                                    }

                                    {provided.placeholder}
                                </div>
                            )
                        }
                    }
                </Droppable>
            </DragDropContext>
        );
    }

}

export default DraggablePersonCardListView;