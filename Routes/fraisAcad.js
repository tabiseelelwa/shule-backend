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

router.put("/modif/frais/:code", (req, res) => {
  const code = req.params.code;
  const requete =
    "UPDATE fraisacad SET designFrais = ?, montFrais = ? WHERE idFrais = ?";
  Bdd.query(requete, [req.body.designation, req.body.montant, code], (err) => {
    if (err) return res.json(err);
    return res.json({ Message: "Modifié....!" });
  });
});

router.delete("/sup/frais/:code", (req, res) => {
  const code = req.params.code;
  const requete = "DELETE FROM fraisacad WHERE idFrais = ?";
  Bdd.query(requete, [code], (err) => {
    if (err) return res.json(err);
    return res.json({ Message: "Supprimé....!" });
  });
});
module.exports = router;
