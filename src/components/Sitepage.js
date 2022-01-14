import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import AddBrood from "./AddBrood";
import UpdateBrood from "./UpdateBrood";

const Sitepage = () => {
  const [showAddbrood, setaddBrood] = useState(false);
  const [site, setSite] = useState([]);
  const loc = useLocation();

  useEffect(() => {
    const getSite = async () => {
      const siteFromServer = await fetchSite(loc.pathname);

      setSite(siteFromServer);
    };
    getSite();
  }, []);

  const fetchSite = async (id) => {
    console.log(id);
    const res = await fetch(`${id}`);
    const data = await res.json();

    return data;
  };
  //maak seker jy update die site reg na die post
  const addBrood = async (brood) => {
    const newBrood = { id: `${site._id}`, name: brood.name };

    const res = await fetch("/sites/brood", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(newBrood),
    });

    const data = await res.json();
    console.log(data);
    setSite(data);
  };
  //build form use form to complete func
  const updateBrood = async (data) => {
    data.id = `${site._id}`;

    const res = await fetch("/sites/broodupdate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(data),
    });
  };

  return (
    <Router>
      <div>
        <div>
          <SiteHeader
            site={site}
            onAdd={() => setaddBrood(!showAddbrood)}
            showAdd={showAddbrood}
          />
          <Route
            render={(props) => (
              <>{showAddbrood && <AddBrood onAdd={addBrood} />} </>
            )}
          />
        </div>
        {site.name && site.broods.length > 0 ? (
          <UpdateBrood site={site} onUpDate={updateBrood} />
        ) : (
          "No Broods"
        )}
      </div>
    </Router>
  );
};

export default Sitepage;
