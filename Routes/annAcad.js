const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

// Création d'une année académique
router.post("/nouvAnneeAcad", (req, res) => {
  const code = Date.now();
  const requete =
    "INSERT INTO annee_acad(idAnnee, designAnnee, statut) VALUES(?)";
  const values = [code, req.body.designation, req.body.statut];
  Bdd.query(requete, [values], (err) => {
    if (err) return res.json(err);
    return res.json({ Message: "Enregistrement effectué..!" });
  });
});

// Afficher toutes les années académiques
router.get("/list/ann-acad", (req, res) => {
  const requete = "SELECT * FROM annee_acad";
  Bdd.query(requete, (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Afficher une année académique
router.get("/annacad/:code", (req, res) => {
  const code = req.params.code;
  const requete = "SELECT * FROM annee_acad WHERE idAnnee = ?";
  Bdd.query(requete, [code], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Modifier l'année académique
router.put("/modif/ann-acad/:code", (req, res) => {
  const code = req.params.code;
  const requete = "UPDATE annee_acad SET designAnnee = ?, WHERE idAnnee = ?";
  Bdd.query(requete, [req.body.designation, code], (err) => {
    if (err) return res.json(err);
    return res.json({ Message: "Midification effectuée" });
  });
});

// Modifier le statut
router.put("/modif/statut/:code", (req, res) => {
  const code = req.params.code;
  const requete = "UPDATE annee_acad SET statut = ? WHERE idAnnee = ?";
  Bdd.query(requete, [req.body.statut, code], (err) => {
    if (err) return res.json(err);
    return res.json({ Message: "Midification effectuée" });
  });
});

router.delete("/suppr/ann-acad/:code", (req, res) => {
  const code = req.params.code;
  const requete = "DELETE FROM annee_acad WHERE idAnnee = ?";
  Bdd.query(requete, [code], (err) => {
    if (err) return res.json(err);
    return res.json({ Message: "Supprimé...!" });
  });
});

module.exports = router;
