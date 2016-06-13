const util = require('util');
const readline = require('readline');

function Todo({ id, title, completed, deleted } = {}) {
  return { id, title, completed, deleted };
}

function add_todo(todos, title) {
    let new_id = todos.length + 1;
    todos.push(Todo({
        id: new_id,
        title: title,
        completed: false,
        deleted: false,
    }));
}

function remove_todo(todos, todo_id) {
  todos = todos.map(todo => {
    if (todo.id === Number.parseInt(todo_id, 10)) {
      todo.deleted = true;
    }
  });
}

function toggle_todo(todos, todo_id) {
  todos = todos.map(todo => {
    if (todo.id === Number.parseInt(todo_id, 10)) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
}

function print_todos(todos) {
    console.log("\n\nTodo List:\n-------------------");
    for (let todo of todos) {
        if (!todo.deleted) {
            let done = todo.completed ? "✔" : " ";
            console.log(util.format("[%s] %d %s", done, todo.id, todo.title));
        }
    }
}

function invalid_command(command) {
    console.log(util.format("Invalid command: %s", command));
}

function processInput(io, todos) {
  let instructions = "\nAvailable commands: \nadd [text] - toggle [id] - remove [id]\n";

  io.question(instructions, command => {
      let command_parts = command.split(' ');
      switch(command_parts[0]) {
        case 'add':
          add_todo(todos, command_parts.slice(1).join(' '));
          break;
        case 'toggle':
            toggle_todo(todos, command_parts[1]);
            break;
        case 'remove':
            remove_todo(todos, command_parts[1]);
            break;
        default:
            invalid_command();
      }
      print_todos(todos);
      processInput(io, todos);
  });
}

function main() {
    let todos = [];

    const io = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });

    processInput(io, todos);
}
main();
