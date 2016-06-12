struct Board {
    tiles: [char; 9],
}

impl Board {
    fn new() -> Board {
        Board { tiles: ['-'; 9] }
    }

    fn print(&self) {
        let mut i = 0;
        let mut output: String = "".to_string();
        for t in self.tiles.iter() {
            if i == 0 || i % 3 == 0 {
                output.push('|');
            }
            output.push(*t);
            if i != 0 && (i+1) % 3 == 0 {
                output.push('|');
                output.push('\n');
            }
            i += 1;
        }
        println!("{}", output);
    }
}

struct Game<'a> {
    board: &'a mut Board,
}

impl <'a> Game<'a> {
    fn new(board: &'a mut Board) -> Game<'a> {
        Game { board: board }
    }

    fn add_move(&mut self, m: (usize, char)) {
        self.board.tiles[m.0] = m.1;
    }

    fn print_board(&self) {
        self.board.print();
    }
}

fn main() {
    let mut board = Board::new();
    let mut game = Game::new(&mut board);
    game.print_board();
    game.add_move((4, 'X'));
    game.add_move((1, 'O'));
    game.add_move((0, 'X'));
    game.add_move((8, 'O'));
    game.add_move((3, 'X'));
    game.add_move((6, 'O'));
    game.add_move((5, 'X'));
    game.print_board();
}
