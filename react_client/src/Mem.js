import React from "react";
import drawCircle from "./utilities/canvasLoadAnimation";

function Mem(props) {
  console.log(props);
  const { totalMem, freeMem, memUsage } = props.memData;
  const canvas = document.querySelector(`.${props.cpuData.cpuWidgetId}`);
  drawCircle(canvas, memUsage * 100);

  return (
    <div className="col-sm-3 mem">
      <h3>Memory Usage</h3>
      <div className="canvas-wrapper">
        <canvas
          className={props.memData.memWidgetId}
          width="200px"
          height="200px"
        ></canvas>
        <div className="mem-text">{memUsage * 100}%</div>
        <div>
          Total Memory: {Math.floor((totalMem / 1073741824) * 100) / 100} GB
        </div>
        <div>
          Free Memory: {Math.floor(((freeMem / 1073741824) * 100) / 100)} GB
        </div>
      </div>
    </div>
  );
}

export default Mem;
