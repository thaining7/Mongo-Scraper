# Mongo-Scraper
## Phoronix Edition

### Scrape, save and comment on the latest tech news articles from Phoronix
#### Heroku App: https://mongo-scrapetastic.herokuapp.com/

# Motivation

#### This application demonstrates CRUD database operations using MongoDB as a database

#### Tech Used:

* jQuery
* Express
* Handlebars
* Mongoose
* MongoDB
* Cheerio
* Axios

# Code Example

#### Scrape article API route using Cheerio NPM package:

```
router.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.phoronix.com/scan.php?page=home").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every header within an article tag, and do the following:
        $("article header").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = "https://www.phoronix.com/scan.php" + $(this)
                .children("a")
                .attr("href");
            result.summary = $(this)
                .siblings("p")
                .text();

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });

        // Send a message to the client
        res.send("Scrape Complete");
    });
});
```

# How to use

#### Click the "scrape articles" button to get the latest articles from Phoronix. Click the "clear articles" button to clear old articles. Click the "save article" button to save an article. Click the "saved articles" link to view the saved articles and save notes for each article.
