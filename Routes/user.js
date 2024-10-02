const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

// Création d'une classe
router.post("/nouveluser", (req, res) => {
  const code = Date.now();
  const sql =
    "INSERT INTO users(`codeClasse`, `designClasse`, `section`) VALUES(?)";
  const values = [code, req.body.designation, req.body.section];
  Bdd.query(sql, [values], (err, reslutat) => {
    if (err) return res.json(err);
    return res.json(reslutat);
  });
});
