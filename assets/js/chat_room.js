import socket from "./socket"

let chatRoomTitle = document.getElementById("chat-room-title")

if (chatRoomTitle) {
  let chatRoomName = chatRoomTitle.dataset.chatRoomName
  let channel = socket.channel(`chat_room:${chatRoomName}`, {})
  let messagesContainer = document.querySelector("[data-role='messages']")

  let messageForm = document.getElementById("new-message-form")
  let messageInput = document.getElementById("message")
  messageForm.addEventListener("submit", event => {
    event.preventDefault()
    channel.push("new_message", {body: messageInput.value})
    event.target.reset()
  })

  channel.on("new_message", payload => {
    let messageItem = document.createElement("li")
    messageItem.dataset.role = "message"
    messageItem.innerText = payload.body
    messagesContainer.appendChild(messageItem)
  })

  channel.join()
}
