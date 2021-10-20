//The node program that captures local performancee data
//and sends it to a socket.io server
//Requirements:
//-farmhash
//-socket.io-client

//What we need to know from node about performance
//--Current  CPU Load
//--Memory Usage:: Free, Total, OS Type, Uptime,
//--CPU Info: Type, No. of Cores, Clock Speed
const os = require("os");
const { io } = require("socket.io-client");
let socket = io("http://127.0.0.1:8181");

socket.on("connect", () => {
  // console.log("I connected to the socket server array");
  //We need a way to identify this machine to anyone interested
  const netInterface = os.networkInterfaces();
  console.log(netInterface);
  let macA;

  //Loop through all thenetwork interfaces forthis machine and find a non-internal one
  for (let key in netInterface) {
    if (!netInterface[key].internal) {
      macA = netInterface[key].mac;
      break;
    }
  }

  //Client auth with single key value
  socket.emit("clientAuth", "qqqqqqqqqqqqq");

  performanceData().then((allPerformanceData) => {
    allPerformanceData.macA = macA;
    socket.emit("initPerfData", allPerformanceData);
  });

  //Start sending over data on internet
  let perfDataInterval = setInterval(() => {
    performanceData().then((allPerformanceData) => {
      // console.log(allPerformanceData);
      socket.emit("perfData", allPerformanceData);
    });
  }, 1000);

  socket.on("disconnect", () => {
    clearInterval(perfDataInterval);
  });
});

function performanceData() {
  return new Promise(async (resolve, reject) => {
    const osType = os.type();
    console.log("OS Type", osType);

    const upTime = os.uptime();
    console.log("UPTIME", upTime);

    const freeMem = os.freemem();
    console.log("FREEMEM", freeMem);

    const totalMem = os.totalmem();
    console.log("TOTALMEM", totalMem);

    const cpus = os.cpus();
    const cpuModel = cpus[0].model;
    const cpuSpeed = cpus[0].speed;
    const numCores = cpus.length;

    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor((usedMem / totalMem) * 100) / 100;
    console.log(memUsage);

    const cpuLoad = await getCpuLoad();
    resolve({
      osType,
      upTime,
      freeMem,
      totalMem,
      cpuModel,
      cpuSpeed,
      numCores,
      memUsage,
    });
  });
}

//cpus is all cores, we need the load averge of all the cores
function cpuAverage() {
  const cpus = os.cpus();
  //Get ms in each mode, but this number is since reboot
  //So get it now, and get it in 100ms and compare
  let idleMs = 0;
  let totalMs = 0;
  cpus.forEach((core) => {
    //Loop through each property of the current core
    for (type in core.times) {
      totalMs += core.times[type];
    }
    idleMs += core.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
}
//Because the times property is time since boot, we will get
//now times, and 100ms from now times, compare them and this
//will give the current load

function getCpuLoad() {
  return new Promise((resolve, reject) => {
    const start = cpuAverage();
    setTimeout(() => {
      const end = cpuAverage();
      const idleDifference = end.idle - start.idle;
      const totalDifference = end.total - start.total;

      // console.log(idleDifference, totalDifference);
      const percentageCpu =
        100 - Math.floor((100 * idleDifference) / totalDifference);
      // console.log(percentageCpu);
      resolve(percentageCpu);
    }, 100);
  });
}

performanceData().then((allPerformanceData) => {
  console.log(allPerformanceData);
});
