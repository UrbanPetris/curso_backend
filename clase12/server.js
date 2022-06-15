const express = require("express");
const http = require("http");
const app = express();
const fs = require("fs");

const server = http.createServer(app);
const io = require("socket.io")(server);

const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

app.get("/", (req, res) => {
  try {
    res.status(200).sendFile(__dirname + "/public/index.html");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

let productos = [];
let chat = [];
let idMessage = 1;

io.on("connection", (channel) => {
  sendMessages();
  sendProducts();

  channel.on("incomingProduct", (product) => {
    productos.push(product);
    sendProducts();
  });

  channel.on("incomingMessage", async (message) => {
    const newMessage = { ...message, idMessage };
    chat.push(newMessage);
    sendMessages();
    idMessage += 1;
    try {
      await fs.promises.writeFile(
        "productos.txt",
        JSON.stringify(chat, null, 2)
      );
    } catch (err) {
      console.log("Ha habido un error", err);
    }
  });
});

const sendMessages = () => io.sockets.emit("chat", chat);
const sendProducts = () => io.sockets.emit("productList", productos);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
