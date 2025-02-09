const express = require("express");
const router = express.Router({ mergeParams: true });
const queryController = require("../Controller/query");

router.get("/", queryController.renderQueryPage);

router.post("/", queryController.createQuery);

module.exports = router;
