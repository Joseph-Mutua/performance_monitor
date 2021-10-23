import React, { Component } from "react";
import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";
import "./widget.css";

class Widget extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      osType,
      upTime,
      freeMem,
      totalMem,
      cpuModel,
      cpuSpeed,
      numCores,
      memUsage,
      cpuLoad,
      macA,
    } = this.props.data;

    const cpu = { cpuLoad };
    const mem = { totalMem, freeMem, memUsage };
    const info = { macA, osType, upTime, cpuModel, numCores, cpuSpeed };

    return (
      <div>
        <h1>Widget!!</h1>
        <div>
          {" "}
          <Cpu cpuData={cpu} />
        </div>

        <div>
          {" "}
          <Mem memData={mem} />
        </div>
        <div>
          <Info infoData={info} />
        </div>
      </div>
    );
  }
}

export default Widget;
