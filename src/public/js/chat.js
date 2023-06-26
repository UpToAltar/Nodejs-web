function handleSocket(username,room) {
    const socket = io("http://localhost:8000");

    const roomName = document.getElementById("room-name");
    roomName.innerText = room;


    const chatWrap = document.querySelector(".chat-messages");
    socket.on("message", (message) => {
        const output = document.createElement("div");
        output.innerHTML = `
    <div class="message">
        <p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">
            ${message.text}
        </p>
    </div>
    `;
        chatWrap.append(output);
        const lastchild = chatWrap.lastElementChild;
        lastchild.scrollIntoView({ behavior: "smooth", block: "end" });
    });
    socket.emit("joinRoom", { username, room });

    const chatForm = document.getElementById("chat-form");
    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = e.target.elements.msg.value;
        socket.emit('message', value);
        e.target.elements.msg.value = "";
        e.target.elements.msg.focus();
    })
    // cập nhật danh sách
    socket.on("userAll", (userArr) => {
        const userTotal = document.querySelector(".users-total");
        userTotal.innerHTML = userArr.length;
        const list = document.getElementById("users");
        let output = ``;

        userArr.forEach(user => {
            output+=`<li>${user}</li>`
        });
        list.innerHTML = output;
    }
    )
    socket.on("deleteUser", (username) => {
        const list = document.getElementById("users");
        const listItems = document.querySelectorAll("#users li");
        listItems.forEach(item => {
            if(item.textContent == username) {
                item.remove();
            }
        })
    })
    
}



