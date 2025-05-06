import { useEffect } from "react";
import SVG from "react-inlinesvg";
import { AnimatePresence, motion } from "framer-motion";
import { useTodosChange } from "../../../contexts/TodoContext.jsx"; 
import foodIcon from "./../../../assets/images/categories/food.svg";
import gameIcon from "./../../../assets/images/categories/game.svg";
import otherIcon from "./../../../assets/images/tomato.svg";
import sportIcon from "./../../../assets/images/categories/sport.svg";
import studyIcon from "./../../../assets/images/categories/study.svg";
import workIcon from "./../../../assets/images/categories/work.svg";

export default function EditTodoModal({onClose, newValue, setNewValue, 
                                      editingTodoId, setEditingTodoId}) {
  const { todos, setTodos } = useTodosChange();

  const categories = [
    studyIcon,
    gameIcon,
    foodIcon,
    workIcon,
    sportIcon,
    otherIcon,
  ];

  useEffect(() => {
    let handler = (e) => {
      if (!e.target.closest(".windowTodo")) {
        cancelEditing();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [cancelEditing]);

  function cancelEditing() {
    setEditingTodoId(null);
    setNewValue({ title: "", category: "", priority: "" });
    onClose();
  }

  function saveEditing() {
    if (!newValue.title.trim()) return;

    setTodos(
      todos.map((todo) =>
        todo.id === editingTodoId
          ? {
              ...todo,
              title: newValue.title,
              category: newValue.category,
              priority: newValue.priority,
            }
          : todo
      )
    );
    setEditingTodoId(null);
    setNewValue({ title: "", category: "", priority: "" });
    onClose();
  }

  return (
    <>
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
            <input
              className="todoInput"
              type="text"
              value={newValue.title}
              placeholder="Add here new title..."
              onChange={(e) =>
                setNewValue({ ...newValue, title: e.target.value })
              }
            />
            <div className="categories__section">
              <h3 className="addSectionTitle">Select Category</h3>
              <div className="categories">
                {categories.map((category) => (
                  <label
                    className="category"
                    key={category}
                    htmlFor={`radioCategory-${category}`}
                  >
                    <input
                      className="radioCategory"
                      type="radio"
                      name="category"
                      value={category}
                      onChange={(e) =>
                        setNewValue({ ...newValue, category: e.target.value })
                      }
                      checked={newValue.category === category}
                    />
                    <SVG
                      className="svgThreeIcon svgTwoIcon categoryImg"
                      src={category}
                      width={50}
                      height={50}
                      alt="work icon"
                      title={category}
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className="priorities__section">
              <h3 className="addSectionTitle">Set Priority</h3>
              <select
                className="priorities"
                value={newValue.priority}
                onChange={(e) =>
                  setNewValue({ ...newValue, priority: e.target.value })
                }
              >
                <option value="">None</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="windowBtn__section">
              <button className="windowBtn cancel" onClick={cancelEditing}>
                Cancel
              </button>
              <button className="windowBtn save" onClick={saveEditing}>
                Save
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
