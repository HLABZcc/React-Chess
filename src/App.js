import React from "react";
import { connect } from "react-redux";
import ChessBoard from "./components/ChessBoard";

const App = (props) => <ChessBoard {...props} />;

const mapStateToProps = ({ matchReducer }) => matchReducer;
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
