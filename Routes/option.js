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
  Bdd.query(requete, [values], (err, resultat) => {
    if (err) return res.json(err);
    return res.json({ Message: "Enregistré......" });
  });
});

// Affichage des toutes les optionss
router.get("/options", (req, res) => {
  const requete = "SELECT * FROM options";
  Bdd.query(requete, (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Afficher une seule options
router.get("/options/:codeoptions", (req, res) => {
  const code = req.params.codeoptions;
  const requete = "SELECT * FROM options WHERE codeOption = ?";
  Bdd.query(requete, [code], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Afficher toutes les optionss d'une section
router.get("/options/section/:section", (req, res) => {
  const section = req.params.section;
  const requete = "SELECT * FROM options WHERE section = ?";
  Bdd.query(requete, [section], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

router.put("/modifoptions/:codeOptions", (req, res) => {
  const code = req.params.codeOptions;
  const requete =
    "UPDATE options SET designOption = ?, descOption = ?, section = ? WHERE codeOption = ?";
  Bdd.query(
    requete,
    [req.body.designation, req.body.description, req.body.section, code],
    (err, resultat) => {
      if (err) return res.json(err);
      return res.json(resultat);
    }
  );
});

router.delete("/supoptions/:codeoptions", (req, res) => {
  const code = req.params.codeoptions;
  const requete = "DELETE FROM options WHERE codeOption = ?";
  Bdd.query(requete, [code], (err) => {
    if (err) return res.json(err);
    return res.json({ Message: "Supprimé..!" });
  });
});

module.exports = router;
