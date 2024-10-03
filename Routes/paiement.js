const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");
const moment = require("moment");

router.post("/nouvpaiement", (req, res) => {
  const numpaie = PAIE + "_" + Date.now();
  const datepai = moment(Date.now()).format("DD-MM-YYYY");
  const sql =
    "INSERT INTO paiement(numpaiem, montantpaiement, motif, datepaie) ";
  const values = [numpaie, req.body.montant, req.body.motif, datepai];
  Bdd.query(sql, [values], (err, resultat) => {
    if (err) return res.json(err);
    return res.json({ Message: "Enregistrement confirmé..." });
  });
});
