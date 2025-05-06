import SVG from "react-inlinesvg";
import iconClose from "./../../assets/images/icon-close.svg";

export default function SettingHeader({ onClose }) {

  return (
    <section className="settingsHeaderSection">
      <h1 className="settingsHeaderTitle">SETTINGS</h1>
      <SVG
        className="iconClose"
        src={iconClose}
        alt="Close icon"
        aria-label="Close settings"
        onClick={onClose}
      />
    </section>
  );
}
