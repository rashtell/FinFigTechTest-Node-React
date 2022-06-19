import express from "express";
import cors from "cors";
import { json } from "body-parser";
import morgan from "morgan";

const app = express();

//setup database
require("./config/mongoose.js")(app);

app.use(morgan("dev"));
app.use(cors());
app.use(json());
app.use("/src/files", express.static("files"));

app.get("/", (req, res) => {
  return res.json({
    message: "Arise developers",
  });
});

require("./app/routeHandler").default(app);

//handle unfound endpoints
app.all("*", (req, res) => {
  return res.status(404).json({
    type: "error",
    msg: "Enpoint not found",
    data: null,
    extra: null,
  });
});

const httpsPort = process.env.HTTPS_PORT || 4443;
const httpPort = process.env.HTTP_PORT || 4480;

app.listen(httpPort, () => {
  console.log(`Application is running on port ${httpPort}`);
});
