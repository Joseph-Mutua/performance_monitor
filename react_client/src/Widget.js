import React, { Component } from "react";
import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";

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
        <Cpu cpuData={cpu} />
        <Mem memData={mem} />
        <Info infoData={info} />
      </div>
    );
  }
}

export default Widget;
