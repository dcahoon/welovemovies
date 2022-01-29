
exports.up = function(knex) {
    return knex.schema.createTable("reviews", (t) => {
        t.increments("review_id").primary()
        t.text("content")
        t.integer("score")
        t.integer("critic_id")
        t
            .foreign("critic_id")
            .references("critic_id")
            .inTable("critics")
            .onDelete("cascade")
        t.integer("movie_id")
        t  
            .foreign("movie_id")
            .references("movie_id")
            .inTable("movies")
            .onDelete("cascade")
        t.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("reviews")
};


/* - `review_id`: (Primary Key) A unique ID for the review.
- `content`: (Text) The content of the review, written in markdown.
- `score`: (Integer) A numerical representation of the score given to the movie by the critic.
- `critic_id`: (Foreign Key) A reference ID to a particular critic.
- `movie_id`: (Foreign Key) A reference ID to a particular movie.

An example record looks like the following:

```json
{
  "review_id": 1,
  "content": "...",
  "score": 4,
  "movie_id": 1,
  "critic_id": 4,
  "created_at": "2021-02-23T20:48:13.315Z",
  "updated_at": "2021-02-23T20:48:13.315Z"
} */