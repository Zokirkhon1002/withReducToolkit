import React from "react";
import { useDispatch } from "react-redux";
import { toggleCompleted, deleteTodo } from "../redux/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleCompleted({ id, completed: !completed }));
  };

  const handleDelete = ()=> {
	  let check = window.confirm(`Are you sure to delete ${title}?`)
	  if(check){
		dispatch(deleteTodo({
			id
		}))
	  }
	  else {
		  return;
	  }
  }
  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input type="checkbox" className="mr-3" checked={completed} onChange={handleClick}></input>
          {title}
        </span>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
