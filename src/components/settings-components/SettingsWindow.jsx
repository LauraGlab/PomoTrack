import { useState, useEffect} from "react";
import { AnimatePresence, motion } from "framer-motion";
import SettingsHeader from "./SettingsHeader.jsx";
import SettingsTheme from "./SettingsTheme.jsx";
import SettingsTimer from "./SettingsTimer.jsx";
import "./../../css/header/SettingsWindow.css";

export default function SettingsWindow({ onClose }) {
  useEffect(() => {
    let handler = (e) => {
      if (!e.target.closest(".window")) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  return (
    <div className="backgroundBlur">
      <AnimatePresence>
        <motion.div
          key="modal"
          className="window windowHeader"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
        >
          <SettingsHeader onClose={onClose} />
          <hr />
          <SettingsTimer />
          <hr />
          <SettingsTheme onClose={onClose}/>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
