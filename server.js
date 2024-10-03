const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apprRoutes = require("./Routes/Apprenant");
const classeRoutes = require("./Routes/classe");
const userRoutes = require("./Routes/user");
const sectionRoutes = require("./Routes/section");
const paiementRoutes = require("./Routes/paiement");

// const moment = require("moment")
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://empire-fronten.fizitech.org"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// Les routes
app.use("/api", apprRoutes);
app.use("/api", classeRoutes);
app.use("/api", userRoutes);
app.use("/api", sectionRoutes);
app.use("/api", paiementRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Le serveur est actif au port ${port}`);
});
