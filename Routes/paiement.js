const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");
const moment = require("moment");

// Création d'un paiement
router.post("/nouvpaiment", (req, res) => {
  const numpaie = "PAIE" + "_" + Date.now();
  const datepai = moment(Date.now()).format("DD-MM-YYYY");
  const requete =
    "INSERT INTO paiement(`numPaiement`, `montantPaiement`, `motifPaiement`, `datePaiement`, `apprenant`) VALUES(?)";
  const values = [
    numpaie,
    req.body.montant,
    req.body.motif,
    datepai,
    req.body.apprenant,
  ];
  Bdd.query(requete, [values], (err) => {
    if (err) return res.json(err);
    return res.json({ Message: "Enregistrement confirmé..." });
  });
});

// Afficher tous les paiements
router.get("/paiements", (req, res) => {
  const requete = "SELECT * FROM paiement";
  Bdd.query(requete, (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Modification d'un paiement
router.put("/modifpaiement/:numPaiement", (req, res) => {
  const numpaie = req.params.numPaiement;
  const requete =
    "UPDATE paiement SET montantPaiement = ?, motifPaiement = ?, apprenant = ? WHERE numPaiement = ?";

  Bdd.query(
    requete,
    [req.body.montant, req.body.motif, req.body.apprenant, numpaie],
    (err, donnees) => {
      if (err) return res.json(err);
      return res.json({ Message: "Modification effectuée avec succès..." });
    }
  );
});

// Recherche d'un paiement par rapoort à une date
router.get("/paiements/date/:datePaiament", (req, res) => {
  const datePaie = req.params.datePaiament;
  const requete = "SELECT * FROM paiement  WHERE datePaiement = ?";

  Bdd.query(requete, [datePaie], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Recherche des paiements effectués aujourd'hui
router.get("/paiements/aujourdhui/:datePaiament", (req, res) => {
  const datePaie = moment(Date.now()).format("DD-MM-YYYY");
  const requete = "SELECT * FROM paiement  WHERE datePaiement = ?";

  Bdd.query(requete, [datePaie], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Recherche des paiements par étudiant
router.get("/paiement/apprenant/:apprenant", (req, res) => {
  const apprenant = req.params.apprenant;
  const requete = "SELECT * FROM paiement  WHERE apprenant = ?";

  Bdd.query(requete, [apprenant], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Recherche des paiements par agent
router.get("/paiement/agent/:agent", (req, res) => {
  const agent = req.params.agent;
  const requete = "SELECT * FROM paiement  WHERE agent = ?";

  Bdd.query(requete, [agent], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// suppression d'un paiement
router.delete("/suppaiement/:numPaiement", (req, res) => {
  const numpaie = req.params.numPaiement;
  const requete = "DELETE FROM paiement WHERE numPaiement = ?";
  Bdd.query(requete, [numpaie], (err) => {
    if (err) return res.json(err);
    return res.json({ Message: "Supprimé avec succès..." });
  });
});

module.exports = router;
