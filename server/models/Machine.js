const mongoose = require("mongoose");
const { Schema } = mongoose;

const Machine = new Schema({
  macA: String,
  osType: String,
  upTime: Number,
  freeMem: Number,
  totalMem : Number,
  cpuModel: String,
  cpuSpeed: Number,
  numCores: Number,
  memUsage: Number,
});

module.exports = mongoose.model("Machine", Machine);
