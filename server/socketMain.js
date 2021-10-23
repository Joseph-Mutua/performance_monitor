const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://perfData:perfData@cluster0.gf60g.mongodb.net/perfData?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const Machine = require("./models/Machine");

function socketMain(io, socket) {
  let macA;
  socket.on("clientAuth", (key) => {
    if (key === "qqqqqqqqqqqqq") {
      //valid nodeClient has joined
      socket.join("clients");
    } else if (key === "wwwwwwwwww") {
      //valid ui client has joined
      socket.join("ui");
      console.log("A ui socket has joined");
      Machine.find({}, (err, docs) => {
        docs.forEach((aMachine) => {
          aMachine.isActive = false;
          io.to("ui").emit("data", aMachine);
        });
      });
    } else {
      //an invalid client has joined, Goodbye
      socket.disconnect(true);
    }
  });

  socket.on("disconnect", () => {
    Machine.find({ macA: macA }, (err, docs) => {
      if (docs.length > 0) {
        //Send one last emit to React
        docs[0].isActive = false;

        io.to("ui").emit("data", docs[0]);
      }
    });
  });

  //A machine has connected, check to see if its new
  //If it's, add it!
  socket.on("initPerfData", async (data) => {
    //update our function scoped variable
    macA = data.macA;

    //now go check mongo
    const mongooseResponse = await checkAndAdd(macA);
    console.log(mongooseResponse);
    // console.log("initPerfData", data);
  });

  // console.log("A socket connected! Wooow", socket.id);
  socket.on("perfData", (data) => {
    console.log("Tick.......");
    io.to("ui").emit("data", data);
  });
}

function checkAndAdd(data) {
  //Needs to be a promise as its accessding database
  return new Promise((resolve, reject) => {
    Machine.findOne({
      macA: data.macA,
    })
      .then((response) => {
        if (response === null) {
          let newMachine = new Machine(data);
          newMachine.save();
        } else {
          res.send(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

module.exports = socketMain;
