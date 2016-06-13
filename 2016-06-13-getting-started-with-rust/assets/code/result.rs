impl Person {
    // ...
    fn add_age(&mut self, age: u8) -> Result<u8, String>{
    if age > 100 {
        Err("Please enter a valid age".to_string())
    } else {
        self.age = Some(age);
        Ok(age)
    }
}

fn main() {
    // ...
    fredrik.add_age(33);

    match fredrik.add_age(133) {
        Err(reason) => println!("Error: {}", reason),
        Ok(new_age) => println!("Age set to {}", new_age),
    }
}
