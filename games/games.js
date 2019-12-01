import {
    Router
} from 'express';

import {
    saveGame as createGame,
    checkGame,
    addMove,
    getGame,
    resetGame
} from '../store/games'
const router = Router();

router.get('/:gameId', (req, res) => {
    const {
        gameId
    } = req.params
    getGame(gameId).then(game => {
        res.json(game);
        res.send()
    })

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
        console.log(resp);
        res.send({
            ...resp
        })

    })
})

router.post('/:gameId/move', (req, res) => {
    const {
        gameId
    } = req.params;

    const {
        xPos,
        yPos,
        user
    } = req.body

    checkGame(gameId).then(resp => {
        if (resp.length > 0) {
            addMove({
                xPos,
                yPos,
                user,
                gameId
            })
            res.send({
                status: 'ok'
            })

        } else {
            res.status(400)
            res.send(`invalid gameId: ${gameId}`)
        }

    })
})

router.post('/:gameId/reset', (req, res) => {
    const {
        gameId
    } = req.params;
    // check valid gameId
    resetGame(gameId).then(
        res.send({
            status: 'ok'
        })
    )
})
export default router