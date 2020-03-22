const express = require("express");
const router = express.Router();
const Training = require("../models/Training");

//get trainings
router.get("/", async (req, res) => {
  const trainings = await Training.find()
    .limit(3)
    .exec();
  res.render("index", { trainings: trainings });
});

//search for trainings
router.get("/search", async (req, res) => {
  let searchOptions = {};

  if (req.query.tags != null && req.query.tags !== "") {
    searchOptions.tags = new RegExp(req.query.tags, "gi");
  }

  try {
    const allTrainings = await Training.find(searchOptions);
    res.render("search", {
      allTrainings: allTrainings,
      searchOptions: req.query
    });
  } catch {
    res.redirect("/");
  }
});

//create new training
router.post("/", async (req, res) => {
  const training = new Training({
    name: req.body.name,
    duration: req.body.duration,
    stack: req.body.stack,
    description: req.body.description,
    price: req.body.price,
    tags: req.body.tags
  });

  await training.save();

  res.send(training);
});



module.exports = router;
