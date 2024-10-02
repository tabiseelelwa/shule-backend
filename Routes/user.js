const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

// Création d'une classe
router.post("/nouveluser", (req, res) => {
  const id = Date.now();
  const sql =
    "INSERT INTO users(`iduser`, `noms`, `telephone`, `email`, `motdepasse`, `role`) VALUES(?)";
  const values = [
    id,
    req.body.noms,
    req.body.telephone,
    req.body.email,
    req.body.mdp,
    req.body.role,
  ];
  Bdd.query(sql, [values], (err, reslutat) => {
    if (err) return res.json(err);
    return res.json(reslutat);
  });
});

module.exports = router;
