import express from 'express';
import cors from 'cors';
import router from './routes/index';
import { connect_mongo } from './mongo';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/', router);
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

connect_mongo();
