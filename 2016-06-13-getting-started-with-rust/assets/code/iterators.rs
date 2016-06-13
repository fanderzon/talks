let numbers = vec![1,2,3,4,5,6,7,8,9,10];

let doubled: Vec<i32> = numbers
    .iter()
    .map(|n| n * 2)
    .collect();
