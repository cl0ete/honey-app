import Button from "./Button";
import { useLocation } from "react-router";

const Main_page = ({ onAdd, showAdd }) => {
  const loc = useLocation();
  return (
    <header className="header">
      <h1>Gansbaai Heuning</h1>
      {loc.pathname === "/update" && (
        <Button text={showAdd ? "close" : "Add Site"} onClick={onAdd} />
      )}
    </header>
  );
};

export default Main_page;
