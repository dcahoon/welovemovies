const theatersService = require("./theaters.service")

function list(req, res, next) {
    theatersService
        .list()
        .then((data) => res.json({ data }))
        .catch(next)
}

module.exports = {
    list,
}


/* const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
  }); */

/*   .increments("movie_id").primary()
        t.string("title")
        t.integer("runtime_in_minutes")
        t.string("rating")
        t.text("description")
        t.string("image_url")
        t.timestamps(true, true) */