const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

router.post("/nouvsection", (req, res) => {
  const code = Date.now();
  const values = [code, req.body.designation];
  const sql = "INSERT INTO section(`codeSection`, `designSection`) VALUES(?)";
  Bdd.query(sql, [values], (err, resultat) => {
    if (err) return res.json(err);
    return res.json({
      //   resultat,
      message: "Enregistrement effectué avec succès",
    });
  });
});

router.get("/sections", (req, res) => {
  const sql = "SELECT * FROM section";
  Bdd.query(sql, (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

router.get("/section/:codeSection", (req, res) => {
  const code = req.params.codeSection;
  const sql = "SELECT * FROM section WHERE codeSection = ?";
  Bdd.query(sql, [code], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

router.put("/modifsection/:codeSection", (req, res) => {
  const code = req.params.codeSection;
  const sql = "UPDATE section SET designSection = ? WHERE codeSection = ?";
  Bdd.query(sql, [req.body.designation, code], (err, resultat) => {
    if (err) return res.json(err);
    return res.json(resultat);
  });
});

module.exports = router;
