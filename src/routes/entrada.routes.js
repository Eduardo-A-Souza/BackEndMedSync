const { Router } = require("express");
const {
  registerEntry,
  getEntries,
} = require("../controllers/entrada.controller");

const router = Router();

// post
router.post("/", registerEntry);

// get
router.get("/", getEntries);

module.exports = router;
