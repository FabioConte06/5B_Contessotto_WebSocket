const input = document.getElementById("input");
const button = document.getElementById("sendButton");
const chat = document.getElementById("chat");
const userListElement = document.getElementById("userList");
const setNameButton = document.getElementById("setNameButton");
const usernameInput = document.getElementById("username");

const template = "<li class=\"list-group-item\">%MESSAGE</li>";
const messages = [];
const users = [];

const socket = io();

window.onload = () => {
  $('#nameModal').modal('show');
};

setNameButton.onclick = () => {
  const username = usernameInput.value.trim();
  if (username) {
    socket.emit("setName", username);
    $('#nameModal').modal('hide');
  }
};

input.onkeydown = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    button.click();
  }
};

button.onclick = () => {
  socket.emit("message", input.value);
  input.value = "";
};

// Ricezione messaggi di chat
socket.on("chat", (message) => {
  console.log(message);
  messages.push(message);
  renderChat();
});

// Ricezione lista utenti
socket.on("list", (list) => {
  users.length = 0; // Pulisci l'array degli utenti
  list.forEach(user => {
    users.push(user.name);
  });
  renderUserList();
});

// Funzione per rendere la chat
const renderChat = () => {
  let html = "";
  messages.forEach((message) => {
    const row = template.replace("%MESSAGE", message);
    html += row;
  });
  chat.innerHTML = html;
  window.scrollTo(0, document.body.scrollHeight);
};

// Funzione per rendere la lista degli utenti
const renderUserList = () => {
  userListElement.innerHTML = ""; // Pulisci la lista esistente
  users.forEach((user) => {
    const row = `<li class="list-group-item">${user}</li>`;
    userListElement.innerHTML += row;
  });
};