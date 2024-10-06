const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

router.post("/nouvfrais", (req, res) => {
  const code = Date.now();
  const requete =
    "INSERT INTO  fraisacad(idFrais, designFrais, montFrais) VALUES(?)";
  const values = [code, req.body.designation, req.body.montant];
  Bdd.query(requete, [values], (err) => {
    if (err) return res.json(err);
    return res.json({ Message: "Enregistré.....!" });
  });
});

router.get("/list/frais", (req, res) => {
  const requete = "SELECT * FROM fraisacad";
  Bdd.query(requete, (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

module.exports = router;
