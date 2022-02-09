const moviesService = require("./movies.service")

function movieExists(req, res, next) {
    const { movieId } = req.params
    if (Number.isInteger(Number.parseInt(movieId))) {
        moviesService
            .read(movieId)
            .then((movie) => {
                if (movie) {
                    res.locals.movie = movie
                    return next()
                }
                next({ status: 404, message: `Movie not found with id: ${movieId}` })
            })
            .catch(next)
    } else {
        next({ status: 404, message: `Invalid movie id ${movieId}` })
    }
}

function read(req, res, next) {
    res.json({ data: res.locals.movie })
}

function list(req, res, next) {
    const isShowing = req.query.is_showing
    if (isShowing === "true") {
        moviesService
            .listShowing()
            .then((data) => res.json({ data }))
            .catch(next)
    } else {
        console.log("is showing: ", isShowing)
        moviesService
            .list()
            .then((data) => res.json({ data }))
            .catch(next)

    }
}

function theatersPlayingMovie(req, res, next) {
    moviesService
        .theatersPlayingMovie(res.locals.movie.movie_id)
        .then((data) => res.json({ data }))
        .catch(next)
}

function getReviewsForMovie(req, res, next) {
    moviesService
        .getReviewsForMovie(res.locals.movie.movie_id)
        .then((data) => res.json({ data }))
        .catch(next)
}

module.exports = {
    list: [list],
    read: [movieExists, read],
    theatersPlayingMovie: [movieExists, theatersPlayingMovie],
    getReviewsForMovie: [movieExists, getReviewsForMovie],
}