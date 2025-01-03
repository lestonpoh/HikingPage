import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="text-3xl">
      <Link to="/">LestonHikes</Link>
      <Link to="/about">About</Link>
    </header>
  );
}

export default Header;
