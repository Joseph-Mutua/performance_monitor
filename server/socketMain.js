function socketMain(io, socket) {
  socket.on("clientAuth", (key) => {
    if (key === "qqqqqqqqqqqqq") {
      //valid nodeClient has joined
      socket.join("clients");
    } else if (key === "wwwwwwwwww") {
      //valid ui client has joined
      socket.join("ui");
    }else{
      //an invalid client has joined, Goodbye
      socket.disconnect(true)
    }
    
  });
  // console.log("A socket connected! Wooow", socket.id);
  socket.on("perfData", (data) => {
    console.log(data);
  });
}

module.exports = socketMain;
