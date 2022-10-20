/* eslint-disable */
import Board from "./Board.js";
import { printToConsole, getFEN } from "./utils.js";

export class Game {
  constructor(configuration) {
    this.board = new Board(configuration);
  }

  move(from, to) {
    from = from.toUpperCase();
    to = to.toUpperCase();
    const possibleMoves = this.board.getMoves();
    if (!possibleMoves[from] || !possibleMoves[from].includes(to)) {
      throw new Error(
        `Invalid move from ${from} to ${to} for ${this.board.getPlayingColor()}`
      );
    }
    this.board.move(from, to);
  }

  moves(from = null) {
    return (
      (from
        ? this.board.getMoves()[from.toUpperCase()]
        : this.board.getMoves()) || []
    );
  }

  aiMove(level = 2) {
    const move = this.board.calculateAiMove(level);
    return this.move(move.from, move.to);
  }

  calculateAiMove(level = 2) {
    const move = this.board.calculateAiMove(level);
    return move;
  }

  printToConsole() {
    printToConsole(this.board.configuration);
  }

  exportJson() {
    return this.board.exportJson();
  }

  exportFEN() {
    return getFEN(this.board.configuration);
  }
}

export function moves(config) {
  if (!config) {
    throw new Error("Configuration param required.");
  }
  const game = new Game(config);
  return game.moves();
}

export function status(config) {
  if (!config) {
    throw new Error("Configuration param required.");
  }
  const game = new Game(config);
  return game.exportJson();
}

export function getFen(config) {
  if (!config) {
    throw new Error("Configuration param required.");
  }
  const game = new Game(config);
  return game.exportFEN();
}

export function move(config, from, to) {
  if (!config) {
    throw new Error("Configuration param required.");
  }
  const game = new Game(config);
  game.move(from, to);
  if (typeof config === "object") {
    return game.exportJson();
  } else {
    return game.exportFEN();
  }
}

export function aiMove(config, level = 2) {
  if (!config) {
    throw new Error("Configuration param required.");
  }
  const game = new Game(config);
  const move = game.board.calculateAiMove(level);
  return { [move.from]: move.to };
}
