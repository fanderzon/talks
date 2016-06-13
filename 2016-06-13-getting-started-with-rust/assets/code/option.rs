struct Person {
    name: String,
    age: Option<u8>
}

impl Person {
    fn get_age(&self) -> Option<u8>{
        if self.age.is_some() {
            Some(self.age.unwrap())
        } else {
            None
        }
    }
}

fn main() {
    let mut fredrik = Person { name: "Fredrik".to_string(), age: None };
    println!("{:?}", fredrik.get_age());
}
