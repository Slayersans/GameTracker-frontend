import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Header.css";

function Navigation() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/library">Library</Link>
      <Link to="/games">Store</Link>
      <span>👤 {user.name}</span>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navigation;
