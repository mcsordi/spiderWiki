const express = require("express");
const mongoose = require("mongoose");
const dovenv = require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
mongoose.connect(process.env.BASE_URL);

const Film = mongoose.model("Film", {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String,
});

app.use(express.json());
app.get("/:nameFilm", async (req, res) => {
  const nameFilm = req.params.nameFilm;
  const query = Film.find({ title: { $regex: nameFilm, $options: "i" } });
  const films = await query.exec();
  res.json(films);
});
app.get("/", async (req, res) => {
  const getFilm = await Film.find();
  res.json(getFilm);
});
app.post("/", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url,
  });
  await film.save();
  res.json(film);
});
app.delete("/:id", async (req, res) => {
  const findId = req.params.id;
  const deleteById = await Film.findByIdAndDelete(findId);
  res.json(deleteById);
});

app.put("/:id", async (req, res) => {
  const findId = req.params.id;
  const updateById = await Film.findByIdAndUpdate(
    findId,
    {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      trailer_url: req.body.trailer_url,
    },
    {
      new: true,
    }
  );
  res.json(updateById);
});
app.listen(process.env.PORT, () => {
  console.log("running aplication");
});
