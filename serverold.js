const express = require("express");
const mongoose = require("mongoose");
const Sites = require("./mongoosestuff/schemas");

// Give server what he needs
const app = express();
app.use(express.json());

// Routes needed
// get sites
app.get("/sites", async (req, res) => {
  try {
    const sites = await Sites.find();

    if (!sites) throw Error("No Sites");

    res.status(200).json(sites);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});
// get by id
app.get(`/site/:id`, async (req, res) => {
  const id = req.params.id;

  try {
    const site = await Sites.findById(id);
    if (!site) throw Error("No Site");
    res.status(200).json(site);
  } catch {
    res.status(400).json({ msg: e.message });
  }
});
// post add new site
app.post("/sites", async (req, res) => {
  const newSite = new Sites({
    name: req.body.name,
  });

  try {
    const site = await newSite.save();
    if (!site) throw Error("Something went wrong saving the site");

    res.status(200).json(site);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// post add hive to site
app.post("/sites/brood", async (req, res) => {
  console.log(req.body.id);
  try {
    const site = await Sites.findOneAndUpdate(
      { _id: req.body.id },
      { $push: { broods: { number: req.body.name, data: [] } } },
      { new: true }
    );

    res.status(200).json(site);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// update a hive
app.post("/sites/broodupdate", async (req, res) => {
  try {
    console.log(req.body);
    const site = await Sites.find(req.body.id);

    site.broods.map((brood) => {
      if (brood[0].number === req.body.broodnr) {
        console.log(brood[0].data);
        brood[0].data.push({
          date: req.body.date,
          rame: req.body.rame,
          dagbe: req.body.dagbe,
          fout: req.body.fout,
        });
      }
    });
    site.save();

    res.status(200).json(site);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// Connect to Mongo
const uri = "mongodb://localhost/honey";
mongoose
  .connect(uri)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log(err));

// Setup port sart server
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server be running on port ${port}`));
