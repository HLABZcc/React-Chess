const move = (from, to) => ({
  type: "MOVE",
  payload: {
    from: from,
    to: to,
  },
});

const setLastMoves = (moves) => ({
  type: "SET_LAST_MOVES",
  payload: {
    lastMoves: moves,
  },
});

const gameActions = {
  move,
  setLastMoves,
};

export default gameActions;
