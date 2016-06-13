trait FooFormat {
    fn pretty_format(&self) -> String;
}

impl FooFormat for i32 {
    fn pretty_format(&self) -> String {
        format!("i32: {}", self)
    }
}

struct Person {
    name: String,
    age: u8,
}

impl FooFormat for Person {
    fn pretty_format(&self) -> String {
        format!("a person named {}, age {}",
            self.name, self.age)
    }
}

impl FooFormat for Vec<Person> {
    fn pretty_format(&self) -> String {
        self
            .into_iter()
            .fold("A person list containing:".to_string(), |acc, curr| {
                format!("{}\n{}", acc, curr.pretty_format())
            })
    }
}

fn format_stuff<T: FooFormat>(input: &T) -> String {
    input.pretty_format()
}

fn main() {
    let num = 5;
    let p = Person { name: "Fredrik".to_string(), age: 33 };
    println!("pretty_format num: {} and p: {}", num.pretty_format(), p.pretty_format());

    let mut people_list: Vec<Person> = vec![];
    people_list.push(p);
    people_list.push(Person { name: "Other guy".to_string(), age: 5 });
    println!("{}", people_list.pretty_format());

    println!("{}", format_stuff(&people_list));
}
