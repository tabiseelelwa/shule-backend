const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

// Création d'un utilisateur
router.post("/nouveluser", (req, res) => {
  const id = Date.now();
  const sql =
    "INSERT INTO users(`iduser`, `noms`, `telephone`, `email`, `motdepasse`, `role`) VALUES(?)";
  const values = [
    id,
    req.body.noms,
    req.body.telephone,
    req.body.email,
    req.body.mdp,
    req.body.role,
  ];
  Bdd.query(sql, [values], (err, reslutat) => {
    if (err) return res.json(err);
    return res.json(reslutat);
  });
});

// Affichage de tous les utilisateurs
router.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  Bdd.query(sql, (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// affichage d'un utilisateur
router.get("/user/:idUser", (req, res) => {
  const id = req.params.idUser;
  const sql = "SELECT * FROM users WHERE idUser = ?";
  Bdd.query(sql, [id], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// suppresion d'un utilisateur
router.delete("/supuser/:idUser", (req, res) => {
  const id = req.params.idUser;
  const sql = "DELETE FROM users WHERE idUser = ?";
  Bdd.query(sql, [id], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// modification d'un utilisateur
// router.put();

module.exports = router;
