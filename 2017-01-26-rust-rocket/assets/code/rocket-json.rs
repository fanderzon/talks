#[get("/notes/<id>", format = "application/json")]
fn note_get(id: i32) -> JSON<Note> {
    // use Diesel to get Note record from PostgreSQL
    let connection = establish_connection();
    let note = notes::table
        .find(id)
        .first::<Note>(conn)
        .expect("Error loading note");

    JSON(note)
}
