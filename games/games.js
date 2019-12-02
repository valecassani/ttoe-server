import { Router } from 'express';
import { check, validationResult } from 'express-validator';

import { saveGame as createGame, checkGame, addMove, getGame, resetGame } from '../store/games';
const router = Router();

router.get(
    '/:gameId',
    check('gameId').custom(value => {
        return checkGame(value).then(game => {
            if (!game) {
                return Promise.reject('Not Existing game');
            }
            return true;
        });
    }),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() });
        }
        const { gameId } = req.params;
        getGame(gameId).then(game => res.send(game));
    }
);

router.post('/', [check('players').isIn([2, 3, 4]), check('dimension').isIn([3, 5, 10])], (req, res) => {
    const game = {
        ...req.body,
        currentPlayer: 1
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    createGame(game).then(resp => {
        res.send({
            ...resp
        });
    });
});

router.post(
    '/:gameId/move',
    [
        check('gameId').custom(value => {
            return checkGame(value).then(game => {
                if (!game) {
                    return Promise.reject('Not Existing game');
                }
            });
        })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { gameId } = req.params;

        const { xPos, yPos, user } = req.body;
        getGame(gameId).then(game => {
            if (game.winner === null) {
                addMove({
                    xPos,
                    yPos,
                    user,
                    gameId
                }).then(game => {
                    return res.status(200).send(game);
                });
            } else {
                res.status(400).send({ error: 'The game has a winner' });
            }
        });
    }
);

router.post(
    '/:gameId/reset',
    check('gameId').custom(value => {
        return checkGame(value).then(game => {
            if (!game) {
                return Promise.reject('Not Existing game');
            }
        });
    }),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { gameId } = req.params;
        // check valid gameId
        resetGame(gameId).then(game => res.send(game));
    }
);
export default router;
