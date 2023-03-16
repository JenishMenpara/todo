import {ADD_TODO, DELETE_TODO, UPDATE_TODO} from '../ActionType';

const initialState = {
  todos: [],
};

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const {id, title} = action.payload;
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: id,
            title: title,
          },
        ],
      };
    case DELETE_TODO:
      const newTodoList = state.todos.filter(item => item.id !== action.id);
      return {
        ...state,
        todos: newTodoList,
      };
    case UPDATE_TODO:
      const {todoId, todoTitle} = action.payload;
      const todos = state.todos.filter(todo => {
        return todo.id !== todoId;
      });
      const todo = state.todos.find(todo => todo?.id === todoId);
      todo.title = todoTitle;
      todos.push(todo);

      return {
        ...state,
        todos: [...todos],
      };

    default:
      return state;
  }
};
export default TodoReducer;
