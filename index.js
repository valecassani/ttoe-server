import express from 'express'
import {
    port,
    dbName
} from './config'
import setup from './store/setup'
import games from './games'


const app = express()

app.use(express.json());
app.use('/games', games)
setup().then(() => {
    app.listen(port, () => console.log('server started on port', port))
})