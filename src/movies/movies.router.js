const router = require("express").Router({ mergeParams: true })
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

router.route("/:movieId/reviews")
    .get(controller.getReviewsForMovie)
    .all(methodNotAllowed)

router.route("/:movieId/theaters")
    .get(controller.theatersPlayingMovie)
    .all(methodNotAllowed)

router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed)


module.exports = router


/* - `GET /movies/:movieId`
- `GET /movies/:movieId` (incorrect ID)
- `GET /movies/:movieId/theaters`
- `GET /movies/:movieId/reviews` */
