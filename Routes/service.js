const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

router.post("/nouvserv", (req, res) => {
  const numAgent = Date.now();
  const requete =
    "INSERT INTO service(codeService, designService, descService) VALUES(?)";
  const values = [numAgent, req.body.designation, req.body.description];
  Bdd.query(requete, [values], (err, resultat) => {
    if (err) return res.json(err);
    return res.json({ Message: "Enregistrement effectué..!" });
  });
});

router.get("/services", (req, res) => {
  const requete = "SELECT * FROM service";
  Bdd.query(requete, (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

router.get("/service/:codeService", (req, res) => {
  const code = req.params.codeService;
  const requete = "SELECT * FROM service WHERE codeService = ?";
  Bdd.query(requete, [code], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

router.put("/modifservice/:codeService", (req, res) => {
  const code = req.params.codeService;
  const requete =
    "UPDATE service SET designService = ?, descService = ? WHERE codeService = ?";

  Bdd.query(
    requete,
    [req.body.designation, req.body.description, code],
    (err, resultat) => {
      if (err) return res.json(err);
      return res.json({ resultat, Message: "Modifié...!" });
    }
  );
});

module.exports = router;
