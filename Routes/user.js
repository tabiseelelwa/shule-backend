const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

// Création d'un utilisateur
router.post("/nouveluser", (req, res) => {
  const id = Date.now();
  const requete =
    "INSERT INTO users(`iduser`, `nomUser`, `postnomUser`, `prenomUser`, `telephone`, `email`, `service`, `role`) VALUES(?)";
  const values = [
    id,
    req.body.nom,
    req.body.postnom,
    req.body.prenom,
    req.body.telephone,
    req.body.email,
    req.body.service,
    req.body.role,
  ];
  Bdd.query(requete, [values], (err, reslutat) => {
    if (err) return res.json(err);
    return res.json({ Message: "Informations ajoutées avec succès" });
  });
});

// Affichage de tous les utilisateurs
router.get("/users", (req, res) => {
  const requete = "SELECT * FROM users";
  Bdd.query(requete, (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// affichage d'un utilisateur
router.get("/user/:idUser", (req, res) => {
  const id = req.params.idUser;
  const requete = "SELECT * FROM users WHERE idUser = ?";
  Bdd.query(requete, [id], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

// suppresion d'un utilisateur
router.delete("/supuser/:idUser", (req, res) => {
  const id = req.params.idUser;
  const requete = "DELETE FROM users WHERE idUser = ?";
  Bdd.query(requete, [id], (err, donnees) => {
    if (err) return res.json(err);
    return res.json({ Message: "Supprimé..!" });
  });
});

// modification d'un utilisateur
router.put("/modifuser/:idUser", (req, res) => {
  const id = req.params.idUser;
  const requete =
    "UPDATE users SET nomUser = ?, postnomUser = ?, prenomUser = ?, telephone = ?, email = ?, service = ?, role = ? WHERE idUser = ?";
  Bdd.query(
    requete,
    [
      req.body.nom,
      req.body.postnom,
      req.body.prenom,
      req.body.telephone,
      req.body.email,
      req.body.service,
      req.body.role,
      id,
    ],
    (err, donnees) => {
      if (err) return res.json(err);
      return res.json({ Message: "Modification effectuée..!" });
    }
  );
});

module.exports = router;
