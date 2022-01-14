import { useState } from "react";

const UpdateBrood = ({ onUpDate, site }) => {
  const [date, setDate] = useState("");
  const [rame, setRame] = useState("");
  const [dagbe, setDag] = useState("");
  const [fout, setFout] = useState("");
  const [broodnr, setBrood] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (!date || !rame || !dagbe || !fout) {
      alert("Hey maak die ding vol");
      return;
    }

    onUpDate({ broodnr, date, rame, dagbe, fout });

    setDate("");
    setRame("");
    setDag("");
    setFout("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="broods">Brood</label>
        <select id="broods" onChange={(e) => setBrood(e.target.value)}>
          <option value="">Select brood</option>
          {site.broods.map((brood) => (
            <option value={brood.number}>{brood.number} </option>
          ))}
        </select>
        <label>Datum</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Rame</label>
        <input
          type="number"
          value={rame}
          min="0"
          max="11"
          onChange={(e) => setRame(e.target.value)}
        />
        <label>Dag beskrywing</label>
        <textarea
          rows="4"
          cols="50"
          value={dagbe}
          onChange={(e) => setDag(e.target.value)}
        >
          beskrywing
        </textarea>
        <label>Wat is fout</label>
        <textarea
          rows="4"
          cols="50"
          value={fout}
          onChange={(e) => setFout(e.target.value)}
        >
          beskrywing
        </textarea>
      </div>
      <input type="submit" value="Save" className="btn-block"></input>
    </form>
  );
};

export default UpdateBrood;
