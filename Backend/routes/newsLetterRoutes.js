const express = require('express');
const router = express.Router();
const { subscribeNewsLetter } = require("../controller/newLetterController");

router.post('/', subscribeNewsLetter);

module.exports = router;
