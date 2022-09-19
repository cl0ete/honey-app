import { useState } from "react";

const AddBrood = ({ onAdd }) => {
  const [name, setSites] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please add name");
      return;
    }
    onAdd({ name });
    setSites("");
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Brood</label>
        <input
          type="name"
          placeholder="Add Brood"
          value={name}
          onChange={(e) => setSites(e.target.value)}
        />
      </div>
      <input type="submit" value="Save" className="btn-block"></input>
    </form>
  );
};

export default AddBrood;
