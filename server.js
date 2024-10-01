import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import moment from "moment";

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

const Bdd = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shule",
});

app.get("/api/message", (req, res) => {
  return res.send("La fumée blanche");
});

// Création d'un élève
app.post("/api/nouveleve", (req, res) => {
  //   const matri = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");
  const matri = Date.now();

  const sql =
    "INSERT INTO apprennant (`matricule`, `nomappr`, `postnomappr`, `prenomappr`, `sexeappr`, `adresseappr`, `classe`, `conduite`, `email`, `telephone`) VALUES (?)";

  const values = [
    matri,
    req.body.nom,
    req.body.postnom,
    req.body.prenom,
    req.body.sexe,
    req.body.adresse,
    req.body.email,
    req.body.telephone,
  ];

  Bdd.query(sql, [values], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });

  console.log(req.body.nom);
});

// Lecture de tous les élèves
app.get("/api/eleves", (req, res) => {
  const sql = "SELECT * FROM apprennant";
  Bdd.query(sql, (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Lecture d'un élève selon son matricule
app.get("/api/eleve/:matricule", (req, res) => {
  const matri = req.params.matricule;
  const sql = "SELECT * FROM apprennant WHERE matricule = ?";
  Bdd.query(sql, [matri], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Lecture des élèves d'une classe
app.get("/api/eleve/classe/:classe", (req, res) => {
  const classe = req.params.classe;
  const sql = "SELECT * FROM apprennant WHERE classe = ?";
  Bdd.query(sql, [classe], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Lecture des élèves selon une conduite
app.get("/api/eleve/conduite/:conduite", (req, res) => {
  const cond = req.params.conduite;
  const sql = "SELECT * FROM apprennant WHERE conduite = ?";
  Bdd.query(sql, [classe], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Modification d'un élève
app.put("/api/eleve/:matricule", (req, res) => {
  const matri = req.params.matricule;
  const tel = req.body.telephone;
  const sql = "UPDATE apprennant SET telephone = ? WHERE matricule = ?";
  Bdd.query(sql, [tel, matri], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Suppression d'un élève
app.delete("/api/supeleve/:matricule", (req, res) => {
  const matri = req.params.matricule;
  const sql = "DELETE FROM apprennant WHERE matricule = ?";
  Bdd.query(sql, [matri], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Le serveur est actif au port ${port}`);
});
