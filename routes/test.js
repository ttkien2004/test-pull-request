const express = require("express");

const { createPeer } = require("../controllers/testController");
const router = express.Router();

// Post new peer
router.post("/post", createPeer);

module.exports = router;
