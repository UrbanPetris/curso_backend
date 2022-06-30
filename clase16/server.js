const express = require("express");
const http = require("http");
const app = express();

const { getProductsAvailable, updateProducts } = require("./models/productos");
const { getHistoricalChat, updateChat } = require("./models/chat");

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

io.on("connection", async (channel) => {
  const historicalChat = await getHistoricalChat();
  await sendMessages(historicalChat);

  const productsAvailable = await getProductsAvailable();
  await sendProducts(productsAvailable);

  channel.on("incomingProduct", async (product) => {
    try {
      const productsUpdated = await updateProducts(product);
      await sendProducts(productsUpdated);
    } catch (err) {
      console.log("Ha habido un error", err);
    }
  });

  channel.on("incomingMessage", async (message) => {
    try {
      const chatUpdated = await updateChat(message);
      await sendMessages(chatUpdated);
    } catch (err) {
      console.log("Ha habido un error", err);
    }
  });
});

const sendMessages = (chat) => io.sockets.emit("chat", chat);
const sendProducts = (productos) => io.sockets.emit("productList", productos);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
