import TomatoLogo from "./../assets/images/tomato.svg";
import "./../css/Loading.css";

export default function Loading() {
  return (
    <div className="loadingPage">
      <img className="logoLoader" src={TomatoLogo} />
      <div className="loader">
      </div>
    </div>
  );
}
