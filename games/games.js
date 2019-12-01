import {
    Router
} from 'express';

import {
    saveGame as createGame,
    checkGame
} from '../store/games'
const router = Router();

router.get('/:gameId', (req, res) => {
    const {
        gameId
    } = req.params
    res.json({
        gameId
    })
    res.send()
})

router.post('/', (req, res) => {
    const game = {
        ...req.body,
        currentPlayer: 1
    }
    if (!game.maxUsers || !game.dimension) {
        res.status(400);
        res.send({
            error: "Invalid data"
        })
        return;
    }
    createGame(game).then((resp) => {
        res.send({
            id: resp[0],
            ...game
        })

    })
})

router.post('/:gameId/move', (req, res) => {
    const {
        gameId
    } = req.params;

    checkGame(gameId).then(resp => {
        if (resp.length > 0) {
            console.log('game exists')
            res.send('ok')
        } else {
            res.status(400)
            res.send(`invalid gameId: ${gameId}`)
        }

    })
})

router.post('/:gameId/reset', (req, res) => {

    // check valid gameId
    res.status(400)
    res.send('invalid game id')
})
export default router