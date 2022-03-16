import React from "react";
import { useSelector } from "react-redux";

const TotalCompleteItems = () => {
  const completedTodos = useSelector(({ todos }) =>
    todos.filter(({ completed }) => completed === true)
  );
  return (
    <h4 className="mt-3">Total Complete Items: {completedTodos.length}</h4>
  );
};

export default TotalCompleteItems;
