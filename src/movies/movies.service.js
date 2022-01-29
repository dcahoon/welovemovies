const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
})

function read(movieId) {
    return knex("movies")
        .select("movie_id", "title", "runtime_in_minutes", "rating", "description", "image_url", "created_at", "updated_at")
        .where({ movie_id: movieId })
        .first()
}

function list() {
    return knex("movies")
        .select("movie_id as id", "title", "runtime_in_minutes", "rating", "description", "image_url")
}

function listShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.movie_id as id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
        .where({ "mt.is_showing": true })
        .groupBy("m.movie_id", "mt.is_showing")
}

function theatersPlayingMovie(movieId) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select(
            "t.*",
            "mt.is_showing",
            "m.movie_id",
        )
        .where({ "m.movie_id": movieId, "mt.is_showing": true })
}

function getReviewsForMovie(movieId) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .join("movies as m", "r.movie_id", "m.movie_id")
        .select("r.*", "c.*")
        .where({ "r.movie_id": movieId })
        .then((reviews) => {
            return reviews.map((review, index) => addCritic(review))
        })
}

module.exports = {
    read,
    list,
    listShowing,
    theatersPlayingMovie,
    getReviewsForMovie,
}

/* {
    "review_id": 1,
    "content": "Lorem markdownum ...",
    "score": 3,
    "created_at": "2021-02-23T20:48:13.315Z",
    "updated_at": "2021-02-23T20:48:13.315Z",
    "critic_id": 1,
    "movie_id": 1,
    "critic": {
      "critic_id": 1,
      "preferred_name": "Chana",
      "surname": "Gibson",
      "organization_name": "Film Frenzy",
      "created_at": "2021-02-23T20:48:13.308Z",
      "updated_at": "2021-02-23T20:48:13.308Z"
    }
  } */

/* "theater_id": 2,
      "name": "Hollywood Theatre",
      "address_line_1": "4122 NE Sandy Blvd.",
      "address_line_2": "",
      "city": "Portland",
      "state": "OR",
      "zip": "97212",
      "created_at": "2021-02-23T20:48:13.342Z",
      "updated_at": "2021-02-23T20:48:13.342Z",
      "is_showing": true,
      "movie_id": 1
    } */

/* "data": {
    "id": 1,
    "title": "Spirited Away",
    "runtime_in_minutes": 125,
    "rating": "PG",
    "description": "Chihiro...",
    "image_url": "https://imdb-api.com/..."
  } */

/* "id": 1,
      "title": "Spirited Away",
      "runtime_in_minutes": 125,
      "rating": "PG",
      "description": "Chihiro ...",
      "image_url": "https://imdb-api.com/..." */
