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

const osType = os.type();
console.log("OS Type", osType);

const upTime = os.uptime();
console.log("UPTIME", upTime);

const freeMem = os.freemem();
console.log("FREEMEM", freeMem);

const totalMem = os.totalmem();
console.log("TOTALMEM", totalMem);

const cpus = os.cpus();
const cpuModel = cpus[0].model
const cpuSpeed = cpus[0].speed;
const numCores = cpus.length;



const usedMem = totalMem - freeMem;
const memUsage = Math.floor((usedMem / totalMem) * 100) / 100;
console.log(memUsage);
