import AddTodo from "./AddToDo";
import ToDosList from "./ToDosList";
import "./../../css/todolist/ToDoList.css";

export default function ToDo() {
  
  return (
    <>
      <div className="toDoListSection">
        <ToDosList/>
        <AddTodo />
      </div>
    </>
  );
}
