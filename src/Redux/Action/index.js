import {ADD_TODO, DELETE_TODO, UPDATE_TODO} from '../ActionType';

export const addNewTodo = todo => {
  return {
    type: ADD_TODO,
    payload: {
      id: Date.now(),
      title: todo,
    },
  };
};
export const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    id,
  };
};

export const updateTodo = (id, todo) => {
  return {
    type: UPDATE_TODO,
    payload: {
      todoId: id,
      todoTitle: todo,
    },
  };
};
