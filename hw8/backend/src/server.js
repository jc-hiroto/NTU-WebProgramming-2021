import WebSocket from 'ws';
import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import dotenv from 'dotenv-defaults';
import { sendData, sendStatus, initData } from './wssConnect';
dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const dbMsg = require('./models/dbMsg');
const port = process.env.PORT || 4000;

const broadcastMsg = (data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
};

const connect_mongo = () => {
    mongoose.connect(process.env.MONGO_URL, {
                 useNewUrlParser: true,
                 useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('connected to mongo');
        wss.on("connection", (ws) => {
            initData(ws);
            ws.onmessage = async (byteStr) => {
                const { data } = byteStr;
                console.log(data);
                const [task, payload] = JSON.parse(data);
                switch (task) {
                    case "input": {
                        const { name, body } = payload;
                        const newMsg = new dbMsg({
                            name,
                            body
                        });
                        try{
                            await newMsg.save();
                        }catch(err){
                            throw new Error("Message DB error: " + err);
                        }
                        broadcastMsg(["output", [payload]], {
                            type: "success",
                            msg: "Message sent."
                        });
                        break;
                    }
                    case "clear": {
                        dbMsg.deleteMany({}, (err) => {
                            if(err) throw new Error("Message DB error: " + err);
                            broadcastMsg(["cleared"], {
                                type: "info",
                                msg: "Message cache cleared."
                            });
                        });
                    }
                    default: break;
                }
            };
        });
    });
};

connect_mongo();

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
