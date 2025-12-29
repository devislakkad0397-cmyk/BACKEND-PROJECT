const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser')
const { connectToMongoDB } = require("./connect");
const {restricToLoggedinUserOnly} = require('./middlewares/auth')
const URL = require("./models/url");

const urlRouter = require("./routes/url");
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user')

const app = express();
const PORT = 8080;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Mongo Error", err));

app.set("view engine","ejs");
app.set("views",path.resolve('./views'))

app.get("/test",async(req,res)=>{
  const allurls = await URL.find({});
  return res.render('home',{
    urls: allurls,
  })
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url",restricToLoggedinUserOnly, urlRouter);
app.use('/',staticRouter);
app.use('/user',userRoute)


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
