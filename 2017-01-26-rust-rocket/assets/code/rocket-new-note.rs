use diesel;
use diesel::prelude::*;
use diesel::pg::PgConnection;
use models::*;
use schema::notes;
use dotenv::dotenv;
use std::env;
use rocket_contrib::JSON;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");

    PgConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url))
}

fn create_note(conn: &PgConnection, note: NoteData) -> Note {
    diesel::insert(&note)
        .into(notes::table)
        .get_result(conn)
        .expect("Error saving new note")
}

#[post("/notes", format = "application/json", data = "<note>")]
fn note_create(note: NoteData) -> JSON<Note> {
    let connection = establish_connection();
    let created_note = create_note(&connection, note);
    JSON(created_note)
}

fn main() {
    rocket::ignite()
        .mount("/", routes![note_create]).launch();
}
