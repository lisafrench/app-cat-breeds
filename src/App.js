import React from "react";
import logo from "./logo.svg";
import Button from "react-bootstrap";
import "./App.css";

export default class App extends React.Component {
  handleButtonClick = () => {
    console.log("log button click");
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello World!</p>
        </header>
        <Button onClick={this.handleButtonClick} />
      </div>
    );
  }
}
