import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="py-3 px-8 bg-slate-50 header-item flex justify-between align font-bold">
      <div className="hover:scale-105 active:scale-95">
        <Link to="/">LestonHikes</Link>
      </div>
      <div className="hover:scale-105 active:scale-95">
        <Link to="/about">About</Link>
      </div>
    </header>
  );
}

export default Header;
