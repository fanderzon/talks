#![feature(plugin)]
#![plugin(rocket_codegen)]
extern crate rocket;
#[macro_use]
extern crate diesel;
#[macro_use]
extern crate diesel_codegen;
extern crate dotenv;
extern crate serde_json;
#[macro_use]
extern crate lazy_static;
#[macro_use]
extern crate rocket_contrib;
#[macro_use]
extern crate serde_derive;
extern crate r2d2;
extern crate r2d2_diesel;

mod schema;
mod db;
mod models;

use db::DB;
use models::*;
use rocket_contrib::JSON;
use rocket::response::status::NoContent;
use diesel::result::Error;


fn get_note(conn: &PgConnection, id: i32) -> Result<Note, Error> {
    notes::table
        .find(id)
        .first::<Note>(conn)
}

fn get_notes(conn: &PgConnection) -> Result<Vec<Note>, Error> {
    notes::table
        .load::<Note>(conn)
}

fn create_note(conn: &PgConnection, note: NoteData) -> Result<Note, Error> {
    diesel::insert(&note)
        .into(notes::table)
        .get_result(conn)
}


fn delete_note(conn: &PgConnection, id: i32) -> Result<usize, Error> {
    diesel::delete(notes::table.find(id))
        .execute(conn)
}

fn update_note(conn: &PgConnection, id: i32, updated_note: NoteData) -> Result<Note, Error> {
    diesel::update(notes::table
        .find(id))
        .set(&updated_note)
        .get_result::<Note>(conn)
}

#[get("/notes", format = "application/json")]
fn notes_get(db: DB) -> Result<JSON<Vec<Note>>, Error> {
    let notes = get_notes(db.conn());
    match notes {
        Ok(notes) => Ok(JSON(notes)),
        Err(err) => Err(err),
    }
}

#[get("/notes/<id>", format = "application/json")]
fn note_get(db: DB, id: i32) -> Result<JSON<Note>, Error> {
    let note = get_note(db.conn(), id);
    match note {
        Ok(note) => Ok(JSON(note)),
        Err(err) => Err(err),
    }
}

#[post("/notes", format = "application/json", data = "<note>")]
fn note_create(db: DB, note: NoteData) -> Result<JSON<Note>, Error> {
    let created_note = create_note(db.conn(), note);
    match created_note {
        Ok(note) => Ok(JSON(note)),
        Err(err) => Err(err),
    }
}

#[patch("/notes/<id>", format = "application/json", data = "<note>")]
fn note_edit(db: DB, id: i32, note: NoteData) -> Result<JSON<Note>, Error> {
    let updated_note = update_note(db.conn(), id, note);
    match updated_note {
        Ok(note) => Ok(JSON(note)),
        Err(err) => Err(err),
    }
}

#[delete("/notes/<id>")]
fn note_delete(db: DB, id: i32) -> Result<NoContent, Error> {
    match delete_note(db.conn(), id) {
        Ok(_) => Ok(NoContent),
        Err(err) => Err(err),
    }
}

fn main() {
    rocket::ignite().mount("/", routes![note_create, notes_get, note_delete, note_edit, note_get]).launch();
}
