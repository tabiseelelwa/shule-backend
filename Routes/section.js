const express = require("express");
const router = express.Router();
const Bdd = require("../bdd/connexion");

router.post("/nouvsection", (req, res) => {
  const code = Date.now();
  const values = [code, req.body.designation];
  const sql =
    "INSERT INTO section(`codeSection`, `designSection`) VALUES(?)";
  Bdd.query(sql, [values], (err, resultat) => {
    if (err) return res.json(err);
    return res.json({
    //   resultat,
      message: "Enregistrement effectué avec succès",
    });
  });
});

module.exports = router;
