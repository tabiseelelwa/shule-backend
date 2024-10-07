const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

// Création d'un élève
router.post("/nouveleve", (req, res) => {
  //   const matri = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");
  const matri = Date.now();

  const requete =
    "INSERT INTO apprennant (`matricule`, `nomappr`, `postnomappr`, `prenomappr`, `sexeappr`, `adresseappr`, `ecole`, `section`, `classe`, `conduite`, `email`, `telephone`) VALUES (?)";

  const values = [
    matri,
    req.body.nom,
    req.body.postnom,
    req.body.prenom,
    req.body.sexe,
    req.body.adresse,
    req.body.ecole,
    req.body.section,
    req.body.classe,
    req.body.conduite,
    req.body.email,
    req.body.telephone,
  ];

  Bdd.query(requete, [values], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });

  console.log(req.body.nom);
});

// Lecture de tous les élèves
router.get("/eleves", (req, res) => {
  const requete = "SELECT * FROM apprennant";
  Bdd.query(requete, (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Lecture d'un élève selon son matricule
router.get("/eleve/:matricule", (req, res) => {
  const matri = req.params.matricule;
  const requete = "SELECT * FROM apprennant WHERE matricule = ?";
  Bdd.query(requete, [matri], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Lecture des élèves selon le sexe
router.get("/eleve/sexe/:sexe", (req, res) => {
  const sexe = req.params.sexe;
  const requete = "SELECT * FROM apprennant WHERE sexeappr = ?";
  Bdd.query(requete, [sexe], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Lecture des élèves d'une école
router.get("/eleve/ecole/:ecole", (req, res) => {
  const ecole = req.params.ecole;
  const requete = "SELECT * FROM apprennant WHERE ecole = ?";
  Bdd.query(requete, [ecole], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Lecture des élèves d'une classe
router.get("/eleve/classe/:classe", (req, res) => {
  const classe = req.params.classe;
  const requete = "SELECT * FROM apprennant WHERE classe = ?";
  Bdd.query(requete, [classe], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Lecture des élèves d'une section
router.get("/eleve/section/:section", (req, res) => {
  const section = req.params.section;
  const requete = "SELECT * FROM apprennant WHERE section = ?";
  Bdd.query(requete, [section], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Lecture des élèves selon une conduite
router.get("/eleve/conduite/:conduite", (req, res) => {
  const cond = req.params.conduite;
  const requete = "SELECT * FROM apprennant WHERE conduite = ?";
  Bdd.query(requete, [cond], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Modification d'un élève
router.put("/eleve/:matricule", (req, res) => {
  const matri = req.params.matricule;
  const tel = req.body.telephone;
  const requete = "UPDATE apprennant SET telephone = ? WHERE matricule = ?";
  Bdd.query(requete, [tel, matri], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// Suppression d'un élève
router.delete("/supeleve/:matricule", (req, res) => {
  const matri = req.params.matricule;
  const requete = "DELETE FROM apprennant WHERE matricule = ?";
  Bdd.query(requete, [matri], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

module.exports = router;
