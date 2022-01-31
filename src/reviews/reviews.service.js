const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
})

function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first()
}

function destroy(reviewId) {
    return knex("reviews")
        .where({ review_id: reviewId })
        .del()
}

function list() {
    return knex("reviews")
        .select("*")
}

function update(updatedReview) {
    return knex("reviews as r")
        .where({ "r.review_id": updatedReview.review_id })
        .update(updatedReview)
        .returning("*")
        .then((updatedReviews) => {
            return knex("reviews as r")
                .join("critics as c", "r.critic_id", "c.critic_id")
                .select("r.*", "c.*")
                .where({ "r.review_id": updatedReview.review_id })
                .then((updatedReviews) => addCritic(updatedReviews[0]))
        })
}

module.exports = {
    read,
    delete: destroy,
    list,
    update,
}


/* join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*") */

/* "critic_id": 1,
      "preferred_name": "Chana",
      "surname": "Gibson",
      "organization_name": "Film Frenzy",
      "created_at": "2021-02-23T20:48:13.308Z",
      "updated_at": "2021-02-23T20:48:13.308Z" */


/*       return knex("reviews as r")
      .select("*")
      .where("review_id", updatedReview.review_id)
      .update(updatedReview)
      .then((updatedReviews) => addCritic(updatedReviews[0]))       
       */