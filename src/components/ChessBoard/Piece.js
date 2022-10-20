import styled from "styled-components";

const Piece = styled.img`
  z-index: 3;
  width: 10vh;
`;

const importAll = (require) =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "").replace(".svg", "")] = require(next).default;
    return acc;
  }, {});

export const piecesSvgs = importAll(
  require.context("../../assets/pieces/", false, /.svg$/)
);

export default Piece;
