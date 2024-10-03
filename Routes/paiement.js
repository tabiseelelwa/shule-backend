const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");
const moment = require("moment");

router.post("/nouvpaiment", (req, res) => {
  const numpaie = "PAIE" + "_" + Date.now();
  const datepai = moment(Date.now()).format("DD-MM-YYYY");
  const sql =
    "INSERT INTO paiement(`numPaiement`, `montatPaiement`, `motifPaiement`, `datePaiement`, `apprenant`) VALUES(?)";
  const values = [
    numpaie,
    req.body.montant,
    req.body.motif,
    datepai,
    req.body.apprenant,
  ];
  Bdd.query(sql, [values], (err, resultat) => {
    if (err) return res.json(err);
    return res.json({ Message: "Enregistrement confirmé..." });
  });
});

router.get("/paiements", (req, res) => {
  const sql = "SELECT * FROM paiement";
  Bdd.query(sql, (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

router.put("/modifpaiement/:numPaiement", (req, res) => {
  const numpaie = req.params.numPaiement;
  const sql =
    "UPDATE paiement SET montantPaiement = ?, motifPaiement = ?, apprenant = ? WHERE numPaiement = ?";

  Bdd.query(
    sql,
    [req.body.montant, req.body.motif, req.body.apprenant, numpaie],
    (err, resultat) => {
      if (err) return res.json(err);
      return res.json({ Message: "Modification effectuée avec succès..." });
    }
  );
});

router.delete("/suppaiement/:numPaiement", (req, res) => {
  const numpaie = req.params.numPaiement;
  const sql = "DELETE FROM paiement WHERE numPaiement = ?";
  Bdd.query(sql, [numpaie], (err, resultat) => {
    if (err) return res.json(err);
    return res.json({ Message: "Supprimé avec succès..." });
  });
});

module.exports = router;
