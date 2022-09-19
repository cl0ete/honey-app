import { useState } from "react";
const DisplayInfo = ({ sites }) => {
  const [display, setDis] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    setDis(display);
    setDis("");
  };

  return (
    <div>
      <form className="add" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="site">Kyk hier wat kort wa</label>
          <select id="site" onChange={(e) => setDis(e.target.value)}>
            <option value="">Select site</option>
            {sites.map((site) => (
              <option value={site.name}>{site.name} </option>
            ))}
          </select>
        </div>
      </form>
      <div>
        {sites.map((site) =>
          site.name == display ? (
            <div>
              {site.broods.map((info) => (
                <div>
                  <div>
                    <b>{info.number}</b>
                  </div>

                  <div>
                    <div>{info.data[info.data.length - 1].date}</div>
                    <p>{info.data[info.data.length - 1].fout}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default DisplayInfo;
