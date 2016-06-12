struct Point {
    x: i32,
    y: i32,
}

impl Point {
    fn new(x: i32, y: i32) -> Point {
        Point { x: x, y: y }
    }
}

fn main() {
    let a = Point::new(10,20);
    let b = a;
    // println!("Point x: {}, y: {}", a.x, a.y);

    let c = &b;
    let d = &b;
    println!("Point x: {}, y: {}", c.x, c.y);

    let mut e = Point::new(1,2);
    {
        let f = &mut e;
        f.x = 2;
        // let g = &mut e;
    }
    let h = &mut e;
    h.y = 10;
    println!("Point x: {}, y: {}", h.x, h.y);
    // e.x = 1;
}
// https://is.gd/9HpkES
