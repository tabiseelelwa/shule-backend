const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

// Création d'une nouvelle option
router.post("/nouvoption", (req, res) => {
  const code = Date.now();
  const requete =
    "INSERT INTO option(codeOption, designOption, descOption, section) VALUES(?)";
  const values = [
    code,
    req.body.designation,
    req.body.description,
    req.body.section,
  ];
  Bdd.query(requete, [values], (err, resultat) => {
    if (err) return res.json(err);
    return res.json({ Message: "Enregistré......" });
  });
});

// Affichage des toutes les options
router.get("/options", (req, res) => {
  const requete = "SELECT * FROM option";
  Bdd.query(requete, (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Afficher une seule option
router.get("/option/:codeOption", (req, res) => {
  const code = req.params.codeOption;
  const requete = "SELECT * FROM option WHERE codeOption = ?";
  Bdd.query(requete, [code], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Afficher toutes les options d'une section
router.get("/options/section/:section", (req, res) => {
  const section = req.params.section;
  const requete = "SELECT * FROMoption WHERE section = ?";
  Bdd.query(requete, [section], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

router.put("/modifoption/:codeOption", (req, res) => {
  const code = req.params.codeOption;
  const requete =
    "UPDATE option SET designOption = ?, descOption = ?, section = ? WHERE codeOption = ?";
  Bdd.query(requete, [
    req.body.designation,
    req.body.description,
    req.body.section,
    code,
  ]);
});

router.delete("/supoption/:codeOption", (req, res) => {
  const code = req.params.codeOption;
  const requete = "DELETE FROM option WHERE codeOption = ?";
  Bdd.query(requete, [code], (err) => {
    if (err) return res.json(err);
    return res.json({ Message: "Supprimé..!" });
  });
});

module.exports = router;
