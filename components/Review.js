import { useState } from "react";
const Review = ({ sites }) => {
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
          <label htmlFor="site">Select site to review</label>
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
                  {info.data.map((obj) => (
                    <div>
                      <div>{obj.date}</div>
                      <div>{obj.dagbe}</div>
                    </div>
                  ))}
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

export default Review;
