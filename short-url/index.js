const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRouter = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8080;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Mongo Error", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRouter);


app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).json({ error: "URL not found" });
  }

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () =>
  console.log(`Server started at PORT:${PORT}`)
);
