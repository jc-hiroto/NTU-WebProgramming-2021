import dbMsg from "./models/dbMsg";

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}

const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

const initData = (ws) => {
    dbMsg.find().sort({ created_at: -1}).limit(100).exec((err, data) => {
        if (err) {
            sendStatus("error", ws);
            throw err;
        } else {
            sendData(["init", data], ws);
        }
    });
};

export { sendData, sendStatus, initData };