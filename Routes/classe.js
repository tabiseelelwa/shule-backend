const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

// Création d'une classe
router.post("/create_classe", (req, res) => {
  const code = Date.now();
  const sql =
    "INSERT INTO classe(`codeClasse`, `designClasse`, `section`) VALUES(?)";
  const values = [code, req.body.designation, req.body.section];
  Bdd.query(sql, [values], (err, reslutat) => {
    if (err) return res.json(err);
    return res.json(reslutat);
  });
});

// Afficher toutes les classes
router.get("/classes", (req, res) => {
  const sql = "SELECT * FROM classe";
  Bdd.query(sql, (err, donnees) => {
    if (err) res.json(err);
    return res.json(donnees);
  });
});

// Afficher une seule classe
router.get("/classe/:codeClasse", (req, res) => {
  const code = req.params.codeClasse;
  const sql = "SELECT * FROM classe WHERE codeClasse = ?";
  Bdd.query(sql, [code], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Afficher toutes les classes selon une section
router.get("/classe/section/:section", (req, res) => {
  const section = req.params.section;
  const sql = "SELECT * FROM classe WHERE section = ?";
  Bdd.query(sql, [section], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Modifier une classe
router.put("/modifclasse/:codeClasse", (req, res) => {
  const code = req.params.codeClasse;
  const sql =
    "UPDATE classe set designClasse = ?, section = ?,  WHERE codeClasse = ?";

  Bdd.query(
    sql,
    [code, req.body.designation, req.body.section],
    (err, donnees) => {
      if (err) return res.json(err);
      return res.json(donnees);
    }
  );
});

// Supprimer une classe
router.delete("/supclasse/:codeClasse", (req, res) => {
  const code = req.params.codeClasse;
  const sql = "DELETE FROM classe WHERE codeClasse = ?";
  Bdd.query(sql, [code], (err, donnees) => {
    if (err) res.json(err);
    return res.json(donnees);
  });
});

module.exports = router;
