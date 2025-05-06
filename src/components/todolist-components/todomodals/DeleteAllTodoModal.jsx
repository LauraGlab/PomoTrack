import { AnimatePresence, motion } from "framer-motion";
import { useTodosChange } from "../../../contexts/TodoContext.jsx";
import SVG from "react-inlinesvg";
import dangerIcon from "./../../../assets/images/icon-danger.svg";
import deleteIcon from "./../../../assets/images/icon-delete.svg";

export default function DeleteAllTodoModal({  setDeleteMenu }) {
  const { setTodos } = useTodosChange();

   const clearTodoList = () => {
     setTodos([]);
   };

   const confirmDeleteAllTodos = () => {
     clearTodoList();
     setDeleteMenu(false);
   };

  return (
    <div className="backgroundBlur">
      <AnimatePresence>
        <motion.div
          key="modal"
          className="window windowDelete"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
        >
          <div className="deleteIconSection">
            <div className="deleteSvg">
              <SVG
                className="deleteIcon"
                src={deleteIcon}
                width={20}
                height={20}
                alt="menu icon"
                aria-label="Open the menu"
                title="Open the menu"
              />
            </div>
          </div>
          <p className="deleteText">
            Are you sure you want to delete all the tasks?
          </p>
          <div className="infoDeleteSection">
            <SVG
              className="infoDeleteSvg"
              src={dangerIcon}
              width={15}
              height={15}
              alt="menu icon"
              aria-label="Open the menu"
              title="Open the menu"
            />
            <p className="infoDeleteText">This action cannot be undone</p>
          </div>
          <div>
            <div className="deleteWindowBtn__section">
              <button
                className="deleteWindowBtn cancel"
                onClick={() => setDeleteMenu(false)}
              >
                Cancel
              </button>
              <button
                className="deleteWindowBtn save"
                onClick={confirmDeleteAllTodos}
              >
                Yes, Delete It
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
