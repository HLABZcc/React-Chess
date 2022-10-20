import { combineReducers } from "redux";
import initialLayout from "../constants/boardLayout";
const jsChess = require("../engine/lib/engine.js");

let color = "white";
const checkboard = {};
new Array(64).fill(0).forEach((e, i) => {
  color = i % 8 === 0 ? color : color === "white" ? "black" : "white";
  const squareNotation =
    String.fromCharCode(((i + 1) % 8 || 8) + 64) + (9 - Math.ceil((i + 1) / 8));
  checkboard[squareNotation] = { notation: squareNotation, bgColor: color };
});

const initialState = {
  boardArrangement: initialLayout,
  checkboard,
  gameEngine: new jsChess.Game(),
  lastMoves: [],
};

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVE":
      return {
        ...state,
        boardArrangement: {
          ...state.boardArrangement,
          [action.payload.from]: null,
          [action.payload.to]: state.boardArrangement[action.payload.from],
        },
      };
    case "SET_LAST_MOVES":
      return {
        ...state,
        lastMoves: action.payload.lastMoves,
      };
    default:
      return state;
  }
};

export default combineReducers({
  matchReducer,
});
