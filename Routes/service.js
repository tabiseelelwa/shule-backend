const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

router.post("/nouvserv", (req, res) => {
  const numAgent = Date.now();
  const requete =
    "INSERT INTO service(codeService, designService, descService) VALUES(?)";
  const values = [numAgent, req.body.designation, req.body.description];
  Bdd.query(requete, [values], (err, donnees) => {
    if (err) return res.json(err);
    return res.json({ Message: "Enregistrement effectué..!" });
  });
});

router.get("/services", (req, res) => {
  const requete = "SELECT * FROM service";
  Bdd.query(requete, (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

router.get("/service/:codeService", (req, res) => {
  const code = req.params.codeService;
  const requete = "SELECT * FROM service WHERE codeService = ?";
  Bdd.query(requete, [code], (err, donnees) => {
    if (err) return res.json(err);
    return res.json(donnees);
  });
});

router.put("/modifservice/:codeService", (req, res) => {
  const code = req.params.codeService;
  const requete =
    "UPDATE service SET designService = ?, descService = ? WHERE codeService = ?";

  Bdd.query(
    requete,
    [req.body.designation, req.body.description, code],
    (err, donnees) => {
      if (err) return res.json(err);
      return res.json({ donnees, Message: "Modifié...!" });
    }
  );
});

router.delete("/supservice/:codeService", (req, res) => {
  const code = req.params.codeService;
  const requete = "DELETE FROM service WHERE codeService = ?";

  Bdd.query(requete, [code], (err, donnees) => {
    if (err) return res.json(err);
    return res.json({ Message: "Supprimé...!" });
  });
});

module.exports = router;
