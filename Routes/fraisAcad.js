const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

router.post("/nouvfaris", (req, res) => {
  const code = Date.now();
  const requete =
    "INSERT INTO  fraisacad(idFrais, montFrais, statut) VALUES(?)";
  const values = [code, req.body.montant];
  Bdd.query(requete, [values], (err) => {
    if (err) return res.json(err);
    return res.json({ Message: "Enregistré.....!" });
  });
});

module.exports = router;
