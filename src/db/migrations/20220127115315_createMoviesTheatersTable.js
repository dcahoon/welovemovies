
exports.up = function(knex) {
    return knex.schema.createTable("movies_theaters", (t) => {
        t.integer("movie_id")
        t
            .foreign("movie_id")
            .references("movie_id")
            .inTable("movies")
            .onDelete("cascade")
        t.integer("theater_id")
        t
            .foreign("theater_id")
            .references("theater_id")
            .inTable("theaters")
            .onDelete("cascade")
        t.boolean("is_showing")
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies_theaters")
};


/* - `movie_id`: (Foreign Key) A reference ID to a particular movie.
- `theater_id`: (Foreign Key) A reference ID to a particular theater.
- `is_showing`: (Boolean) A representation of whether or not the movie is currently showing in the referenced theater.

An example record looks like the following:

```json
{
  "movie_id": 1,
  "theater_id": 3,
  "is_showing": false
} */