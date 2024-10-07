const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

// Création d'une nouvelle options
router.post("/nouvoption", (req, res) => {
  const code = Date.now();
  const requete =
    "INSERT INTO options(codeOption, designOption, descOption, section) VALUES(?)";
  const values = [
    code,
    req.body.designation,
    req.body.description,
    req.body.section,
  ];
  Bdd.query(requete, [values], (err, donnees) => {
    if (err) return res.json(err);
    return res.json({ Message: "Enregistré......" });
  });
});

// Affichage des toutes les optionss
router.get("/options", (req, res) => {
  const requete = "SELECT * FROM options";
  Bdd.query(requete, (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Afficher une seule options
router.get("/options/:code", (req, res) => {
  const code = req.params.code;
  const requete = "SELECT * FROM options WHERE codeOption = ?";
  Bdd.query(requete, [code], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Afficher toutes les optionss d'une section
router.get("/options/section/:section", (req, res) => {
  const section = req.params.section;
  const requete = "SELECT * FROM options WHERE section = ?";
  Bdd.query(requete, [section], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

router.put("/modifoptions/:code", (req, res) => {
  const code = req.params.code;
  const requete =
    "UPDATE options SET designOption = ?, descOption = ?, section = ? WHERE codeOption = ?";
  Bdd.query(
    requete,
    [req.body.designation, req.body.description, req.body.section, code],
    (err, donnees) => {
      if (err) return res.json(err);
      return res.json(donnees);
    }
  );
});

router.delete("/supoptions/:code", (req, res) => {
  const code = req.params.codeo;
  const requete = "DELETE FROM options WHERE codeOption = ?";
  Bdd.query(requete, [code], (err) => {
    if (err) return res.json(err);
    return res.json({ Message: "Supprimé..!" });
  });
});

module.exports = router;
