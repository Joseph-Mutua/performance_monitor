import "./App.css";
import { Component } from "react";
import socket from "./utilities/socketConnection";

class App extends Component {
  constructor() {
    super();
    this.state = {
      performanceData: {},
    };
  }

  componentDidMount() {
    socket.on("data", (data) => {
      console.log("DATA FROM NODE CLIENT", data);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sanity Check</h1>
        </header>
      </div>
    );
  }
}

export default App;
