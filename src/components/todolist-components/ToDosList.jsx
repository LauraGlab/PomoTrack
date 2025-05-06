import {useState, useEffect, useContext} from "react";
import { SwipeableList } from "react-swipeable-list";
import { AnimatePresence, motion } from "framer-motion";
import { useTodosChange } from "../../contexts/TodoContext.jsx"; 
import SVG from "react-inlinesvg";
import ToDoItem from "./ToDoItem.jsx";
import DeleteAllTodoModal from "./todomodals/DeleteAllTodoModal.jsx";
import deleteIcon from "./../../assets/images/icon-delete.svg";
import dotsIcon from "./../../assets/images/icon-threeDots.svg";
import otherIcon from "./../../assets/images/tomato.svg";
import "react-swipeable-list/dist/styles.css";
import "./../../css/todolist/ToDoList.css";


export default function ToDosList() {
  const [isMenu, setIsMenu] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const { todos, setTodos } = useTodosChange();

  useEffect(() => {
    let handler = (e) => {
      if (!e.target.closest(".windowSecond")) {
        setIsMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isMenu]);

  function deleteCompleted() {
    setTodos(todos.filter((todo) => todo.done === false));
  }

  return (
    <>
      <div>
        <div className="titleToDo__section">
          <h2 className="titleToDo">
            Tasks List{" "}
            {todos.length === 0 && <span className="titleNumber"></span>}
            {todos.length > 1 && (
              <span className="titleNumber">({todos.length} tasks)</span>
            )}
            {todos.length === 1 && (
              <span className="titleNumber">({todos.length} task)</span>
            )}
          </h2>
          <div className="buttonsDeleteSection">
            <button
              className="menuDelete"
              onClick={() => {
                setIsMenu(true);
              }}
            >
              <SVG
                className="svgTwoIcon"
                src={dotsIcon}
                width={20}
                height={20}
                alt="menu icon"
                aria-label="Open the menu"
                title="Open the menu"
              />
            </button>
          </div>
        </div>
        <div className="tasksSection">
          {todos.length === 0 ? (
            <div className="noTasksDisplay">
              <div>
                <SVG
                  className="deleteCategory svgThreeIcon svgTwoIcon"
                  src={otherIcon}
                  alt="zero tasks image"
                />
                <p className="noTasksText">No tasks</p>
                <p>Click "Add Task" to add one</p>
              </div>
            </div>
          ) : (
            <SwipeableList key={todos.id}>
              {todos.map((todo) => (
                <ToDoItem key={todo.id} todo={todo} />
              ))}
            </SwipeableList>
          )}
        </div>
      </div>
      {isMenu && (
        <AnimatePresence>
          <motion.div
            key="modal"
            className="windowSecond"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
          >
            <button
              className="windowSecondBtn"
              onClick={() => {
                deleteCompleted();
                setIsMenu(false);
              }}
            >
              <SVG
                className="menuTaskSvg"
                src={deleteIcon}
                alt="delete icon"
                width={15}
                height={15}
              />
              <p>Clear finished tasks</p>
            </button>
            <button
              className="windowSecondBtn"
              onClick={() => {
                setDeleteMenu(true);
                setIsMenu(false);
              }}
            >
              <SVG
                className="menuTaskSvg"
                src={deleteIcon}
                alt="delete icon"
                width={15}
                height={15}
              />
              <p>Clear all tasks</p>
            </button>
          </motion.div>
        </AnimatePresence>
      )}
      {deleteMenu && todos.length > 0 && (
        <DeleteAllTodoModal setDeleteMenu={setDeleteMenu} />
      )}
    </>
  );
}
