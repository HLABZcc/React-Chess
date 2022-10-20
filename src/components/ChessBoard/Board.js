import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// components
import BoardContainer from "./Container";
import Square, { DraggingOver } from "./Square";
import Piece, { piecesSvgs } from "./Piece";

// others
import gameActions from "../../redux/actions";

function Board(props) {
  const { boardArrangement, checkboard, gameEngine, lastMoves } = props;
  const [legalMoves, setLegalMoves] = useState([]);
  const dispatch = useDispatch();

  const aiMove = async () => {
    setTimeout(() => {
      const aiMove = gameEngine.calculateAiMove(2);
      gameEngine.move(aiMove.from, aiMove.to);
      dispatch(gameActions.move(aiMove.from, aiMove.to));
      dispatch(gameActions.setLastMoves([aiMove.from, aiMove.to]));
    }, 500);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    const fromNotation = source.droppableId;
    const toNotation = destination.droppableId;
    try {
      setLegalMoves([]);
      gameEngine.move(fromNotation, toNotation);
      dispatch(gameActions.move(fromNotation, toNotation));
      aiMove();
    } catch (e) {
      console.log(e.message);
    }
  };

  const onDragStart = (source) => {
    const fromNotation = source.draggableId;
    setLegalMoves(gameEngine.moves(fromNotation));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <BoardContainer>
        {Object.keys(checkboard).map((notation, i) => {
          const currentSuqarePiece = boardArrangement[notation];
          return (
            <Droppable droppableId={notation}>
              {(provided, snapshot) => {
                const isLegalMove = legalMoves.includes(notation);
                const isPreviousMove = lastMoves.includes(notation);
                return (
                  <Square
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`${checkboard[notation].bgColor} ${
                      isLegalMove
                        ? "highlight"
                        : isPreviousMove
                        ? "previous"
                        : ""
                    }`}
                  >
                    {currentSuqarePiece ? (
                      <Draggable draggableId={notation} index={i}>
                        {(provided) => (
                          <Piece
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            src={
                              piecesSvgs[
                                `${currentSuqarePiece.color}-${currentSuqarePiece.piece}`
                              ]
                            }
                          />
                        )}
                      </Draggable>
                    ) : (
                      <small>{notation}</small>
                    )}
                    {snapshot.isDraggingOver && (
                      <DraggingOver isLegalMove={isLegalMove} />
                    )}
                    <div style={{ visibility: "hidden", height: 0 }}>
                      {provided.placeholder}
                    </div>
                  </Square>
                );
              }}
            </Droppable>
          );
        })}
      </BoardContainer>
    </DragDropContext>
  );
}

export default Board;
