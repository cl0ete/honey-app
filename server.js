const express = require("express");
const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const path = require("path");

// Setup port *********************************************************
const port = process.env.PORT || 8000;

// Connect to Mongo****************************************************
var db;
const url = "mongodb://localhost:27017";
MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err);

  db = client.db("honey");
  console.log("Connected to Mongodb");
});

// Give server what he needs*******************************************
const app = express();
app.use(express.json());

// get sites***********************************************************
app.get("/sites", async (req, res) => {
  try {
    const sites = await db.collection("sites").find().toArray();

    if (!sites) throw Error("No Sites");

    res.status(200).json(sites);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// get by id**********************************************************
app.get(`/update/site/:id`, async (req, res) => {
  const id = req.params.id;
  const o_id = new mongodb.ObjectId(id);

  try {
    const site = await db.collection("sites").find({ _id: o_id }).toArray();

    if (!site) throw Error("No Site");
    res.status(200).json(site[0]);
  } catch {
    res.status(400).json({ msg: e.message });
  }
});

// post add new site**************************************************
app.post("/sites", async (req, res) => {
  try {
    db.collection("sites").insertOne({ name: req.body.name, broods: [] });
    const sites = await db.collection("sites").find().toArray();
    if (!sites) throw Error("Something went wrong saving the site");

    res.status(200).json(sites);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// post add hive to site**********************************************
app.post("/sites/brood", async (req, res) => {
  const id = req.body.id;
  const o_id = new mongodb.ObjectId(id);
  try {
    const site = await db
      .collection("sites")
      .findOneAndUpdate(
        { _id: o_id },
        { $push: { broods: { number: req.body.name, data: [] } } },
        { returnDocument: "after" }
      );

    res.status(200).json(site.value);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// update a hive*****************************************************
app.post("/sites/broodupdate", async (req, res) => {
  const id = req.body.id;
  const o_id = new mongodb.ObjectId(id);
  try {
    const site = await db.collection("sites").updateOne(
      { _id: o_id, "broods.number": req.body.broodnr },
      {
        $push: {
          "broods.$.data": {
            date: req.body.date,
            rame: req.body.rame,
            dagbe: req.body.dagbe,
            fout: req.body.fout,
          },
        },
      }
    );

    res.status(200);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// Serve static assets

app.use(express.static("build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

//Start server********************************************************
app.listen(port, () => console.log(`Server be running on port ${port}`));
