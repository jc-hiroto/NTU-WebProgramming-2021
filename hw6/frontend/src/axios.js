import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:4000/api/v1/guess' });

const sendStart = async () => {
    const resp = await instance.post('/start');
    return resp;
};

const sendGuess = async (number) => {
    const resp = await instance.get('/guess', { params: { number } });
    return resp;
};

const sendRestart = async () => {
    const resp = await instance.post('/restart');
    return resp;
};

export { sendStart, sendGuess, sendRestart };