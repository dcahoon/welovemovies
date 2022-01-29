const reviewsService = require("./reviews.service")

function reviewExists(req, res, next) {
    const { reviewId } = req.params
    if (Number.isInteger(Number.parseInt(reviewId))) {
        reviewsService
            .read(reviewId)
            .then((review) => {
                if (review) {
                    res.locals.review = review
                    console.log(res.locals.review)
                    return next()
                }
                next({ status: 404, message: `Review cannot be found.` })
            })
            .catch(next)
    } else {
        next({ status: 404, message: `Review cannot be found.` })
    }
}

function read(req, res, next) {
    res.json({ data: res.locals.review })
}

function update(req, res, next) {
    const updatedReview = {
        review_id: req.params.reviewId,
        ...req.body.data
    }
    reviewsService
        .update(updatedReview)
        .then((data) => res.json({ data }))
        .catch(next)
}

function list(req, res, next) {
    reviewsService
        .list()
        .then((data) => res.json({ data }))
        .catch(next)
}

function destroy(req, res, next) {
    reviewsService
        .delete(req.params.reviewId)
        .then(() => res.sendStatus(204))
        .catch(next)
}

module.exports = {
    read: [reviewExists, read],
    destroy: [reviewExists, destroy],
    list,
    update: [reviewExists, update],
}