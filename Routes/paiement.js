const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");
const moment = require("moment");

// Création d'un paiement
router.post("/nouvpaiment", (req, res) => {
  const numpaie = "PAIE" + "_" + Date.now();
  const datepai = moment(Date.now()).format("DD-MM-YYYY");
  const sql =
    "INSERT INTO paiement(`numPaiement`, `montantPaiement`, `motifPaiement`, `datePaiement`, `apprenant`) VALUES(?)";
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

// Afficher tous les paiements
router.get("/paiements", (req, res) => {
  const sql = "SELECT * FROM paiement";
  Bdd.query(sql, (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Modification d'un paiement
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

// Recherche d'un paiement par rapoort à une date
router.get("/paiements/date/:datePaiament", (req, res) => {
  const datePaie = req.params.datePaiament;
  const sql = "SELECT * FROM paiement  WHERE datePaiement = ?";

  Bdd.query(sql, [datePaie], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Recherche des paiements effectués aujourd'hui
router.get("/paiements/aujourdhui/:datePaiament", (req, res) => {
  const datePaie = moment(Date.now()).format("DD-MM-YYYY");
  const sql = "SELECT * FROM paiement  WHERE datePaiement = ?";

  Bdd.query(sql, [datePaie], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Recherche des paiements par étudiant
router.get("/paiement/apprenant/:apprenant", (req, res) => {
  const apprenant = req.params.apprenant;
  const sql = "SELECT * FROM paiement  WHERE apprenant = ?";

  Bdd.query(sql, [apprenant], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// suppression d'un paiement
router.delete("/suppaiement/:numPaiement", (req, res) => {
  const numpaie = req.params.numPaiement;
  const sql = "DELETE FROM paiement WHERE numPaiement = ?";
  Bdd.query(sql, [numpaie], (err, resultat) => {
    if (err) return res.json(err);
    return res.json({ Message: "Supprimé avec succès..." });
  });
});

module.exports = router;
