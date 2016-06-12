fn main() {
    let x: &i32;
    {
        let y = 7;
        x = &y;
    }
}
