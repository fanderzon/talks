#include <iostream>
#include <regex>
#include <vector>



using namespace std;

struct Todo {
    int id;
    string title;
    bool completed;
    bool deleted;
};

void add_todo(vector<Todo>& todos, string title) {
    int new_id = todos.size() + 1;
    Todo item = { new_id, title, false, false };
    todos.push_back( item );
}

void remove_todo(vector<Todo>& todos, int id) {
    vector<Todo>::iterator match = std::find_if(todos.begin(), todos.end(),
        [&id](const Todo & t) -> bool { return t.id == id; });
    if (match != todos.end()) {
        match->deleted = true;
    }
}

void toggle_todo(vector<Todo>& todos, int id) {
    vector<Todo>::iterator match = std::find_if(todos.begin(), todos.end(),
        [&id](const Todo & t) -> bool { return t.id == id; });
    if (match != todos.end()) {
        match->completed = !match->completed;
    }
}

void print_todos(vector<Todo>& todos) {
    cout << "\n\nTodo List:\n-------------------" << endl;
    for(std::vector<Todo>::iterator it = todos.begin(); it != todos.end(); ++it) {
        if (!it->deleted) {
            string done = it->completed ? "✔" : " ";
            printf("[%s] %i %s\n", done.c_str(), it->id, it->title.c_str());
        }
    }
    cout << endl;
}

void print_instructions() {
    cout << "\nAvailable commands: \nadd [text] - toggle [id] - remove [id]\n";
}

void invalid_command(string command) {
    printf("Invalid command:  %s", command.c_str());
}



int main() {
    vector<Todo> todos;
    print_instructions();

    regex add_match("^add .*");
    regex add_replace("^add ");
    regex toggle_match("^toggle .*");
    regex toggle_replace("^toggle ");
    regex remove_match("^remove .*");
    regex remove_replace("^remove ");

    while(true) {
        char command[200];
        cin.getline(command,sizeof(command));
        cout << "Command " << command << endl;


        if (regex_match(command, add_match)) {
            add_todo(todos, regex_replace(command, add_replace, ""));
            print_todos(todos);
        } else if (regex_match(command, toggle_match)) {
            toggle_todo(todos, stoi(regex_replace(command, toggle_replace, "")));
            print_todos(todos);
        } else if (regex_match(command, remove_match)) {
            remove_todo(todos, stoi(regex_replace(command, remove_replace, "")));
            print_todos(todos);
        }
    }

    return 0;
}
