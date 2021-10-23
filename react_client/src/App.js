import "./App.css";
import { Component } from "react";
import socket from "./utilities/socketConnection";
import Widget from "./Widget";

class App extends Component {
  constructor() {
    super();
    this.state = {
      performanceData: {},
    };
  }

 

  componentDidMount() {
    socket.on("data", (data) => {
      //Inside this callback, we just got new data
      //Lets update State so we can rerender App --> Widget --> CPU/Mem/Info
      //We need to make a copy of the current State so we can mutate it
      const currentState = { ...this.state.performanceData };

      //Current State is an Object, not an array
      //The reason for this is so we can use the machines macA as it's property

      currentState[data.macA] = data;
      this.setState({
        performanceData: currentState,
      });

      // console.log("DATA FROM NODE CLIENT", data);
    });
  }

  render() {
    console.log(this.state.performanceData);
    let widgets = [];

    const data = this.state.performanceData;
    //Grab each machine by property from data
    Object.entries(data).forEach(([key, value]) => {
      // console.log(key);
      // console.log(value);
      widgets.push(<Widget key={key} data={value} />);
    });

    return <div className="App">{widgets}</div>;
  }
}

export default App;
