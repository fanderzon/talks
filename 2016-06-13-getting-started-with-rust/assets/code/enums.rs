enum Action {
    Todos(TodoAction),
    Visibility(VisibilityFilter),
}

enum TodoAction {
    Add(String),
    Toggle(i16),
    Remove(i16),
}

enum VisibilityFilter {
    ShowActive,
    ShowAll,
    ShowCompleted,
}

let action = TodoAction::Add("Buy milk".to_string());
