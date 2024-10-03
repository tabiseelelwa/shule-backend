const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

// Création d'un élève
router.post("/nouveleve", (req, res) => {
  //   const matri = moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");
  const matri = Date.now();

  const sql =
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

  Bdd.query(sql, [values], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });

  console.log(req.body.nom);
});

// Lecture de tous les élèves
router.get("/eleves", (req, res) => {
  const sql = "SELECT * FROM apprennant";
  Bdd.query(sql, (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Lecture d'un élève selon son matricule
router.get("/eleve/:matricule", (req, res) => {
  const matri = req.params.matricule;
  const sql = "SELECT * FROM apprennant WHERE matricule = ?";
  Bdd.query(sql, [matri], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Lecture des élèves selon le sexe
router.get("/eleve/sexe/:sexe", (req, res) => {
  const sexe = req.params.sexe;
  const sql = "SELECT * FROM apprennant WHERE sexeappr = ?";
  Bdd.query(sql, [sexe], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Lecture des élèves d'une école
router.get("/eleve/ecole/:ecole", (req, res) => {
  const ecole = req.params.ecole;
  const sql = "SELECT * FROM apprennant WHERE ecole = ?";
  Bdd.query(sql, [ecole], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Lecture des élèves d'une classe
router.get("/eleve/classe/:classe", (req, res) => {
  const classe = req.params.classe;
  const sql = "SELECT * FROM apprennant WHERE classe = ?";
  Bdd.query(sql, [classe], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Lecture des élèves d'une section
router.get("/eleve/section/:section", (req, res) => {
  const section = req.params.section;
  const sql = "SELECT * FROM apprennant WHERE section = ?";
  Bdd.query(sql, [section], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Lecture des élèves selon une conduite
router.get("/eleve/conduite/:conduite", (req, res) => {
  const cond = req.params.conduite;
  const sql = "SELECT * FROM apprennant WHERE conduite = ?";
  Bdd.query(sql, [cond], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Modification d'un élève
router.put("/eleve/:matricule", (req, res) => {
  const matri = req.params.matricule;
  const tel = req.body.telephone;
  const sql = "UPDATE apprennant SET telephone = ? WHERE matricule = ?";
  Bdd.query(sql, [tel, matri], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// Suppression d'un élève
router.delete("/supeleve/:matricule", (req, res) => {
  const matri = req.params.matricule;
  const sql = "DELETE FROM apprennant WHERE matricule = ?";
  Bdd.query(sql, [matri], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

module.exports = router;
