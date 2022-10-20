import styled from "styled-components";

const colors = {
  white: "wheat",
  black: "#502e2e",
};

const Square = styled.div`
  box-shadow: inset 0px 0px 12px 0px rgba(0, 0, 0, 0.3);
  &.white {
    background-color: ${colors.white};
    small {
      color: ${colors.black};
    }
  }
  &.black {
    background-color: ${colors.black};
    small {
      color: ${colors.white};
    }
  }
  &.highlight {
    box-shadow: inset 0px 0px 15px 1px rgb(255, 235, 0);
  }
  &.previous {
    box-shadow: inset 0px 0px 15px 1px rgb(46, 32, 249);
  }
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  small {
    position: absolute;
    text-transform: lowercase;
  }
`;

export const DraggingOver = styled.div`
  transition: 0.5s ease-in-out;
  position: absolute;
  z-index: 2;
  width: 11.25vh;
  height: 11.25vh;
  box-shadow: ${({ isLegalMove }) =>
    isLegalMove
      ? "inset 0px 0px 15px 1px rgb(80,250,95)"
      : "inset 0px 0px 15px 1px rgb(250,8,9)"};
`;

export default Square;
