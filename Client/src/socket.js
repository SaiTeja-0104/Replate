import { io } from "socket.io-client";
// import dotenv from 'dotenv';
// dotenv.config();

const socket = io("http://localhost:3000");

export default socket;
