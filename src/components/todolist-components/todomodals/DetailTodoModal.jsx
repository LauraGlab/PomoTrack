import { useState, useContext } from "react";
import SVG from "react-inlinesvg";
import { AnimatePresence, motion } from "framer-motion";
import { useTodosChange } from "../../../contexts/TodoContext.jsx";
import closeIcon from "./../../../assets/images/icon-close.svg";
import "./../../../css/todolist/todomodals/DetailTodoModal.css";

export default function DetailTodoModal({ onClose, todo }) {
  const { todos, setTodos } = useTodosChange();

  return (
    <div className="backgroundBlur">
      <AnimatePresence>
        <motion.div
          key="modal"
          className="windowTodo"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
        >
          <div className="detailClose__section">
            <h2>Details</h2>
            <SVG
              className="svgThreeIcon"
              src={closeIcon}
              onClick={onClose}
              alt="Close"
            />
          </div>
          <table>
            <tbody>
              <tr>
                <th>Title</th>
                <th>
                  <p title={todo.title}>{todo.title}</p>
                </th>
              </tr>
              <tr>
                <th>Category</th>
                <th>
                  <SVG
                    className="detailImg svgThreeIcon svgTwoIcon"
                    src={todo.category}
                    alt="Category"
                  />
                </th>
              </tr>
              <tr>
                <th>Done?</th>
                <th>{todo.done ? <p>Yes ✨</p> : <p>No ❌</p>}</th>
              </tr>
              <tr>
                <th>Priority</th>
                <th>
                  <span
                    className={`priority-tag ${
                      todo.priority === "low"
                        ? "priority-low"
                        : todo.priority === "medium"
                        ? "priority-medium"
                        : todo.priority === "high"
                        ? "priority-high"
                        : ""
                    }`}
                  >
                    {todo.priority ? todo.priority : "None"}
                  </span>
                </th>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
