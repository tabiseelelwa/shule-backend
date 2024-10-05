const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

// Création d'un utilisateur
router.post("/nouveluser", (req, res) => {
  const id = Date.now();
  const requete =
    "INSERT INTO users(`iduser`, `nomUser`, `postnomUser`, `prenomUser`, `telephone`, `email`, `service`, `motdepasse`, `role`) VALUES(?)";
  const values = [
    id,
    req.body.noms,
    req.body.telephone,
    req.body.email,
    req.body.service,
    req.body.mdp,
    req.body.role,
  ];
  Bdd.query(requete, [values], (err, reslutat) => {
    if (err) return res.json(err);
    return res.json(reslutat);
  });
});

// Affichage de tous les utilisateurs
router.get("/users", (req, res) => {
  const requete = "SELECT * FROM users";
  Bdd.query(requete, (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// affichage d'un utilisateur
router.get("/user/:idUser", (req, res) => {
  const id = req.params.idUser;
  const requete = "SELECT * FROM users WHERE idUser = ?";
  Bdd.query(requete, [id], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// suppresion d'un utilisateur
router.delete("/supuser/:idUser", (req, res) => {
  const id = req.params.idUser;
  const requete = "DELETE FROM users WHERE idUser = ?";
  Bdd.query(requete, [id], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

// modification d'un utilisateur
router.put("/modifuser/:idUser", (req, res) => {
  const id = req.params.idUser;
  const requete =
    "UPDATE users SET noms = ?, telephone = ?, email = ?, motdepasse = ?, role = ? WHERE idUser = ?";
  Bdd.query(
    requete,
    [
      req.body.noms,
      req.body.telephone,
      req.body.email,
      req.body.mdp,
      req.body.role,
      id,
    ],
    (err, resultat) => {
      if (err) return res.json(err);
      return res.json(resultat);
    }
  );
});

module.exports = router;
