import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Sites from "./components/Sites";
import AddSite from "./components/AddSite";
import Sitepage from "./components/Sitepage";
import DisplayInfo from "./components/DisplayInfo";
import Review from "./components/Review";
import ReviewButton from "./components/ReviewButton";
import FoutButton from "./components/FoutButton";
import UpdateButton from "./components/UpdateButton";

function App() {
  const [showAddSite, setShowAddSite] = useState(false);
  const [sites, setSites] = useState([]);
  sites.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  useEffect(() => {
    const getSites = async () => {
      const sitesFromServer = await fetchSites();
      setSites(sitesFromServer);
    };
    getSites();
  }, []);

  const fetchSites = async () => {
    const res = await fetch("/sites");
    const data = await res.json();

    return data;
  };

  const addSite = async (site) => {
    const res = await fetch("/sites", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(site),
    });

    const data = await res.json();
    setSites(data);
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddSite(!showAddSite)}
          showAdd={showAddSite}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              <FoutButton />
              <UpdateButton />
              <ReviewButton />
            </>
          )}
        />
        <Route path="/update/site/:id" exact component={Sitepage} />
        <Route
          path="/update"
          exact
          render={(props) => (
            <>
              {showAddSite && <AddSite onAdd={addSite} />}
              <h1>
                <b>Update dag se werk</b>
              </h1>
              <Sites sites={sites} />
            </>
          )}
        />
        <Route
          path="/fout"
          exact
          render={(props) => (
            <>
              <DisplayInfo sites={sites} />
            </>
          )}
        />
        <Route
          path="/review"
          exact
          render={(props) => (
            <>
              <Review sites={sites} />
            </>
          )}
        />
      </div>
    </Router>
  );
}

export default App;
