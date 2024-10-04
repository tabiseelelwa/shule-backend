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

router.get('/services', (req, res)=>{
    const requete = ""
})

module.exports = router;
