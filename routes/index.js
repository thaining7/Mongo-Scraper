var router = require("express").Router();
var apiRoutes = require("./api-routes/api-routes.js");
var views = require("./views");

router.use("/api/", apiRoutes);
router.use("/", views);

module.exports = router;