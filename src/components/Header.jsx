import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navigation from "./Navigation";
import "../styles/Header.css";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header>
      <div>
        <Link to="/">🎮 GameTracker</Link>
      </div>
      {user && <Navigation />}
    </header>
  );
}

export default Header;
