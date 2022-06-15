const socket = io();

const productNameInput = document.querySelector("input[name=name]");
const productPriceInput = document.querySelector("input[name=price]");
const productURLInput = document.querySelector("input[name=url]");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("mensaje");

document.getElementById("loadProducts").addEventListener("submit", (event) => {
  event.preventDefault();
  sendProducts();
});

document
  .getElementById("sendMessageButton")
  .addEventListener("submit", (event) => {
    event.preventDefault();
  });

document.getElementById("sendMessageButton").addEventListener("click", () => {
  sendMessage();
});

function sendMessage() {
  if (!emailInput.value) {
    return alert("debe ingresar un e-mail");
  }

  emailInput.disabled = true;

  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const dateTime = `${date} ${time}`;

  const message = {
    email: emailInput.value,
    time: dateTime,
    text: messageInput.value,
  };

  socket.emit("incomingMessage", message);
  messageInput.value = "";
  messageInput.focus();
}

function sendProducts() {
  const product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    url: productURLInput.value,
  };

  productNameInput.value = "";
  productPriceInput.value = "";
  productURLInput.value = "";

  socket.emit("incomingProduct", product);
}

socket.on("productList", (productos) => {
  const templateStr = `
  {{#if this}}
  <table class="table table-dark">
  <tr class="text-warning">
      <th>Nombre</th>
      <th>Precio</th>
      <th>Imagen</th>
  </tr>
  {{#each this}}
  <tr>
      <td class="align-middle">{{name}}</td>
      <td class="align-middle">{{price}}</td>
      <td class="align-middle"><img style="max-width: 48px" src="{{url}}" alt="{{name}}"></td>
  </tr>
  {{/each}}
  </table>
  {{else}}
  <h2 class="bg-danger rounded text-center m-4">No se encontraron productos</h2>
  {{/if}}`;

  const template = Handlebars.compile(templateStr);
  const html = template(productos);
  document.getElementById("vistaProductos").innerHTML = html;
});

socket.on("chat", (messages) => {
  const templateStr = `
  {{#each this}}
  <div>
  <strong style="color: blue">{{email}}</strong>
  <em style="color: brown">{{time}}</em>
  <em style="color: green">{{text}}</em>
  </div>
  {{/each}}`;

  const template = Handlebars.compile(templateStr);
  const html = template(messages);

  document.getElementById("messages").innerHTML = html;
});
