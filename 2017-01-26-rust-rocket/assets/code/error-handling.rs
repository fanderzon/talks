use diesel;
use diesel::prelude::*;
use diesel::pg::PgConnection;
use models::*;
use schema::notes;
use dotenv::dotenv;
use std::env;
use rocket_contrib::JSON;
use diesel::result::Error;
use db::DB;


fn create_note(conn: &PgConnection, note: NoteData) -> Result<Note, Error> {
    diesel::insert(&note)
        .into(notes::table)
        .get_result(conn)
}

#[post("/notes", format = "application/json", data = "<note>")]
fn note_create(db: DB, note: NoteData) -> Result<JSON<Note>, Error> {
    let created_note = create_note(db.conn(), note);
    match created_note {
        Ok(note) => Ok(JSON(note)),
        Err(err) => Err(err),
    }
}


fn main() {
    rocket::ignite()
        .mount("/", routes![note_create]).launch();
}
