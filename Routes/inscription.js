const express = require("express");
const moment = require("moment");
const router = express.Router();
const Bdd = require("../bdd/connexion");

// Création incription
router.post("/nouvinscription", (req, res) => {
  const datepai = moment(Date.now()).format("DD-MM-YYYY");
  const code = Date.now();
  const requete =
    "INSERT INTO inscription(idInscription, eleve, anneeAcad, classe, Agent, dateInscription) VALUES(?)";
  const values = [
    code,
    req.body.eleve,
    req.body.anneeAcad,
    req.body.classe,
    req.body.agent,
    datepai,
  ];
  Bdd.query(requete, [values], (err) => {
    if (err) return res.json(err);
    return res.json({ Message: "Inscription effetuée....!" });
  });
});

// Afficher toutes les inscriptions
router.get("/list/inscriptions", (req, res) => {
  const requete = "SELECT * FROM inscription";
  Bdd.query(requete, (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Afficher une seule inscription
router.get("/list/inscription/:code", (req, res) => {
  const code = req.params.code;
  const requete = "SELECT * FROM inscription WHERE idInscription = ?";
  Bdd.query(requete, [code], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Afficher les inscriptions par eleve
router.get("/list/inscriptions/eleve/:code", (req, res) => {
  const requete = "SELECT * FROM inscription WHERE eleve = ?";
  const code = req.params.code;
  Bdd.query(requete, [code], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Afficher les inscriptions par agent
router.get("/list/inscriptions/agent/:code", (req, res) => {
  const requete = "SELECT * FROM inscription WHERE agent = ?";
  const code = req.params.code;
  Bdd.query(requete, [code], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Afficher les inscriptions par classe
router.get("/list/inscriptions/classe/:code", (req, res) => {
  const code = req.params.code;
  const requete = "SELECT * FROM inscription WHERE classe = ?";
  Bdd.query(requete, [code], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Afficher les inscriptions par date
router.get("/list/inscriptions/date/:code", (req, res) => {
  const date = req.params.code;
  const requete = "SELECT * FROM inscription WHERE dateInscription = ?";
  Bdd.query(requete, [date], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Afficher les inscription d'aujourd'hui
router.get("/list/inscriptions/today", (req, res) => {
  const date = moment(Date.now()).format("DD-MM-YYYY");
  const requete = "SELECT * FROM inscription WHERE dateInscription = ?";
  Bdd.query(requete, [date], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

module.exports = router;
