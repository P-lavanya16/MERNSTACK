const express = require("express");
const router = express.Router();
const recruiterController = require("../controllers/recruiterController");

router.post("/send-sms-status", recruiterController.sendBulkSmsStatus);

module.exports = router;
