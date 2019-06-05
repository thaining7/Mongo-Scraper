// $.getJSON("/", function (data) {
//     // For each one
//     // console.log(data);
//     for (var i = 0; i < data.length; i++) {
//         if (data[i].summary != undefined) {
//             console.log(data[i].summary);
//             // Display the apropos information on the page
//             $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].summary + "</p>");
//         }

//     }
// });

// When the scrape article button is clicked

$(document).on("click", ".scrape-new", function () {

    // Send the GET request.
    $.get("/scrape/").then(
        function (data) {
            console.log(data);

            // Reload the page to get the updated list
            location.reload();
        }
    );
});

//When the clear article button is clicked

$(document).on("click", ".clear", function () {

    // Send the GET request.
    $.get("/articles/").then(
        function (data) {
            console.log(data);

            // Reload the page to get the updated list
            location.reload();
        }
    );
});

//When the save article button is clicked

$(document).on("click", ".change-saved", function () {
    var thisId = $(this).attr("data-id");
    var newSaved = $(this).data("newsaved");

    var newSavedState = {
        saved: newSaved
    };

    // Send the PUT request.
    $.ajax("/saved/" + thisId, {
        type: "PUT",
        data: newSavedState
    }).then(
        function (data) {
            console.log(data);
            console.log("changed article to", newSaved);
            // Reload the page to get the updated list
            location.reload();
        }
    );
});

//When the delete from saved button is clicked

$(document).on("click", ".delete-saved", function () {
    var thisId = $(this).attr("data-id");
    var newSaved = $(this).data("newsaved");

    var newSavedState = {
        saved: newSaved
    };

    // Send the PUT request.
    $.ajax("/unsave/" + thisId, {
        type: "PUT",
        data: newSavedState
    }).then(
        function (data) {
            console.log(data);
            console.log("changed article to", newSaved);
            // Reload the page to get the updated list
            location.reload();
        }
    );
});

// Whenever someone clicks an a tag

$(document).on("click", ".article-notes", function () {
    // Empty the notes from the note section
    $("#notesModal").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            // The title of the article

            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button class='btn btn-success' data-id='" + data._id + "' id='save-note'>Save Note</button>");

            // $("#notesModal").modal("toggle");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
});

// When you click the savenote button
$(document).on("click", "#save-note", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});
