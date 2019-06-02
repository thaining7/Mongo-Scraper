var router = require("express").Router();
var db = require("../../models");

router.get("/", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            // res.json(dbArticle);
            res.render("home", {articles:dbArticle});
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

router.get("/saved", function (req, res) {
    db.Article.find({ saved: true })
    .then(function (dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        // res.json(dbArticle);
        res.render("saved", {articles:dbArticle});

    })
    .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
    });
});

module.exports = router;