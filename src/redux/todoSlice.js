import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uid } from "uid";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const res = await fetch("http://localhost:7000/todos");
    if (res.ok) {
      const todos = await res.json();
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const res = await fetch("http://localhost:7000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: payload.title,
      }),
    });
    if (res.ok) {
      const todos = await res.json();
      return { todos };
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: uid(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleCompleted: (state, action) => {
      const index = state.findIndex(({ id }) => id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      state.filter(({ id }) => id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      console.log("fetching data...");
      const [soat, minut, sekund, millisekund] = [
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds(),
        new Date().getMilliseconds(),
      ];
      console.log(
        `${soat < 10 ? "0" + soat : soat}:${minut < 10 ? "0" + minut : minut}:${
          sekund < 10 ? "0" + sekund : sekund
        }:${millisekund}`
      );
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      console.log("fetched data successfully.");
      const [soat, minut, sekund, millisekund] = [
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds(),
        new Date().getMilliseconds(),
      ];
      console.log(
        `${soat < 10 ? "0" + soat : soat}:${minut < 10 ? "0" + minut : minut}:${
          sekund < 10 ? "0" + sekund : sekund
        }:${millisekund}`
      );
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
  },
});

export const { addTodo, toggleCompleted, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
