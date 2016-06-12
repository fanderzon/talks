struct Point {
    x: i32,
    y: i32,
}

impl Point {
    fn new(x: i32, y: i32) -> Point {
        Point { x: x, y: y }
    }
}

fn print_point(point: &Point) {
    println!("Point x: {}, y: {}", point.x, point.y);
}

// fn ambiguous_lifetime(a: &i32, b: &i32) -> &i32 {
//     a
// }

fn unambiguous_lifetime<'a>(a: &'a i32, b: &i32) -> &'a i32 {
    a
}

fn main() {
    let a = Point::new(1,2);
    print_point(&a);
    let b = unambiguous_lifetime(&a.x, &a.y);
    println!("{}", &b);
}
// https://is.gd/Vz8csA
