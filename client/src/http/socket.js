import { io } from "socket.io-client";

const URL = "http://localhost:5001";
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
  console.log("socket id -----------> ", socket.id);
});

socket.on("private_message", (message) => {
  console.log("private MESSAGE -> ", message);
});

socket.on("bababu", (data) => {
  console.log("bababy", data);
})

socket.on("connect", () => {
  console.log("SOCKET CONNECTED", socket.id);
})

export default socket;