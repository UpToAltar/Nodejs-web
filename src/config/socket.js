import returnMess from "../helpers/chatFormat";

const chatBot = "ChatBot";
const socketIO = (io, server) => {
    // ! SOcket io
    
    io.on("connection", (socket) => {
        
        socket.on("joinRoom", ({ username, room }) => {

            socket.join(room);
            socket.username = username;
            socket.emit(
                "message",
                returnMess(chatBot,`Welcome <span class="strong-word"> ${username}</span>  to chat app , room <span class="strong-word"> ${room}</span>!`)
            );

            //* Cập nhật danh sách
            // Lấy danh sách socket của người dùng trong phòng
            const clientsInRoom = io.sockets.adapter.rooms.get(room);

            // Tạo một mảng chứa thông tin về các socket người dùng
            const socketsInRoom = [];
            for (const clientId of clientsInRoom) {
                const clientSocket = io.sockets.sockets.get(clientId);
                socketsInRoom.push(clientSocket.username);
            }
            
            io.to(room).emit("userAll", socketsInRoom);


                // TB cho mọi người có ng vào
            socket.broadcast.to(room).emit("message", returnMess(chatBot,`<span class="strong-word"> ${username}</span> has join the chat`));
            
            socket.on("message", (message) => {
                io.to(room).emit('message', returnMess(username,message))
            })
            
            // Xử lí khi có ng ngắt kết nối
            socket.on("disconnect", () => {
                io.to(room).emit('message', returnMess(chatBot,`<span class="strong-word"> ${username}</span> has left the chat`))
                io.to(room).emit("deleteUser", username)
            });
        })
        
    });
    // !--
}

export default socketIO