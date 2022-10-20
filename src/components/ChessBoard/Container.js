import styled from "styled-components";

const BoardContainer = styled.div`
  height: 90vh;
  width: 90vh;
  left: 50%;
  border: 0.1rem solid black;
  padding: 0;
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(8, 11.25vh);
  grid-template-rows: repeat(8, 11.25vh);
  grid-auto-flow: row;
  margin: 0 auto;
  user-select: none;
`;

export default BoardContainer;
