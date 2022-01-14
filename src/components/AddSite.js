import { useState } from "react";

const AddSite = ({ onAdd }) => {
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
        <label>Site</label>
        <input
          type="name"
          placeholder="Add Site"
          value={name}
          onChange={(e) => setSites(e.target.value)}
        />
      </div>
      <input type="submit" value="Save Site" className="btn"></input>
    </form>
  );
};

export default AddSite;
