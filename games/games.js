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
        if (game.id) res.send(game)
        else {
            res.status(404)
            res.send({
                message: 'Not Found'
            })
        }
    })

})

router.post('/', (req, res) => {
    const game = {
        ...req.body,
        currentPlayer: 1
    }
    if (!game.players || !game.dimension) {
        res.status(400);
        res.send({
            error: "Invalid data"
        })
        return;
    }
    createGame(game).then((resp) => {
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

    checkGame(gameId).then(game => {
        if (game && game.winner === null) {
            addMove({
                xPos,
                yPos,
                user,
                gameId
            }).then(game => {
                res.status(200)
                res.send(game)
            })

        } else {
            res.status(400)
            res.send(`invalid input`)
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