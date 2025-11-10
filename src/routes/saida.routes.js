const { Router } = require("express");
const { createExit, getExit } = require("../controllers/saida.controller");

const router = Router();

// post
router.post("/", createExit);

// get
router.get("/", getExit);

module.exports = router;
