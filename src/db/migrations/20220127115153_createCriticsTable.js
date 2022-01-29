
exports.up = function(knex) {
    return knex.schema.createTable("critics", (t) => {
        t.increments("critic_id").primary()
        t.string("preferred_name")
        t.string("surname")
        t.string("organization_name")
        t.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("critics")
};


/* 

- `critic_id`: (Primary Key) A unique ID for the critic.
- `preferred_name`: (String) The critic's preferred first name.
- `surname`: (String) The critic's last name.
- `organization_name`: (String) The name of the organization the critic works for.
{
    "critic_id": 1,
    "preferred_name": "Chana",
    "surname": "Gibson",
    "organization_name": "Film Frenzy",
    "created_at": "2021-02-23T20:48:13.315Z",
    "updated_at": "2021-02-23T20:48:13.315Z"
  } */