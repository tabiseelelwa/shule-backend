const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

// Création d'une nouvelle section
router.post("/nouvsection", (req, res) => {
  const code = Date.now();
  const values = [code, req.body.designation];
  const requete =
    "INSERT INTO section(`codeSection`, `designSection`) VALUES(?)";
  Bdd.query(requete, [values], (err, donnees) => {
    if (err) return res.json(err);
    return res.json({
      message: "Enregistrement effectué avec succès",
    });
  });
});

// Affichage de toutes les sections
router.get("/sections", (req, res) => {
  const requete = "SELECT * FROM section";
  Bdd.query(requete, (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Affichage d'une seule section
router.get("/section/:codeSection", (req, res) => {
  const code = req.params.codeSection;
  const requete = "SELECT * FROM section WHERE codeSection = ?";
  Bdd.query(requete, [code], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Modification d'une section
router.put("/modifsection/:codeSection", (req, res) => {
  const code = req.params.codeSection;
  const requete = "UPDATE section SET designSection = ? WHERE codeSection = ?";
  Bdd.query(requete, [req.body.designation, code], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Suppresion d'une section
router.delete("/supsection/:codeSection", (req, res) => {
  const code = req.params.codeSection;
  const requete = "DELETE FROM section WHERE codeSection = ?";
  Bdd.query(requete, [code], (err, donnees) => {
    if (err) return res.json(err);
    return res.json({ Message: "Enregistrement supprimé...." });
  });
});

module.exports = router;
