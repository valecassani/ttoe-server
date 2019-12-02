import express from 'express';
import cors from 'cors';
import { port, dbName } from './config';
import setup from './store/setup';
import games from './games';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/games', games);
setup().then(() => {
    app.listen(port, () => console.log('server started on port', port));
});
