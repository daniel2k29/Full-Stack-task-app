import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/login"); // go back to login page
  };

  return (
    <header style={{ marginBottom: 20 }}>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
