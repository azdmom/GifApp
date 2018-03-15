var couples = ["Claire and Phil", "Eric and Tami", " Lily and Marshall", "Jim and Pam", "Chandler and Monica", "Cory and Topanga", "Jesse and Becky", "Meredith and Derek"];

  // displayCouple function re-renders the HTML to display the appropriate content
function displayCouple() {
    $("panel").empty();
    $(".card").show();

    var couple = $(this).attr("data-couple");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    couple + "&api_key=bZjJVrkWHb9PoapAfcygKjgTVaRXIG84";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: 'GET'

     }).then(function(response) {
        console.log(response);

    var results = response.data;
    // Looping over every result item
    for (var i = 0; i < 10; i++) {
        
          // Creating a div with the class "item"
          var gifDiv = $("<div class='item'>");
          // Storing gif rating
          var rating = results[i].rating;

          // Creating image tag
          var coupleImage = $("<img + class='image'>");
          // Creating a paragraph tag with gif rating
          var p = $("<p class='rating'>").text("Rating: " + rating);
          // Create img tag
          coupleImage.attr("src", results[i].images.fixed_height_still.url);
          coupleImage.attr("data-still", results[i].images.fixed_height_still.url);
          coupleImage.attr("data-animate", results[i].images.fixed_height.url);
          coupleImage.attr("data-pair", 'still');
          coupleImage.addClass("gif");
          
          // Appending p and coupleImage we created to the "gifDiv" div we created
          gifDiv.append(coupleImage);
          gifDiv.append(p);
         
          // Appending the gifDiv to the "#display" div in the HTML
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            $("#displayGifs").append(gifDiv);
        }

        else {
        }
    }

           $(".gif").on("click", function ()  {
        
        var pair = $(this).attr("data-pair");
            if (pair === "still") {
            console.log(pair);
            $(this).attr("src", $(this).attr("data-animate"));
        
            $(this).attr("data-pair", "animate");
            var animate = $(this).attr("data-animate");
    
            console.log(animate);

            console.log(this);
            console.log(pair);
            } 
            
            else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-pair", "still");
            }
    });
});

};

   function renderButtons() {
    // Deleting the giphys prior to adding new ones
    $("#buttons-view").empty();
    // Looping through the array of couples
        for (var i = 0; i < couples.length; i++) {
            // Then dynamicaly generating buttons for each couple in the array
            var a = $("<button + type='button' + class='btn btn-primary btn-sm'>");
            // Adding a data-attribute
            a.addClass("couple-btn", couples[i]);
            a.attr("data-couple", couples[i]);
            // Providing the initial button text
            a.text(couples[i]);
            // Adding the button to the HTML
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where one button is clicked
    $("#add-couple").on("click", function(event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var couple = $("#couple-input").val().trim();
        // Adding the movie from the textbox to our array
        couples.push(couple);
        //Clears couple from search box
        document.getElementById("couple-form").reset();
        // Calling renderButtons which processes the array
        renderButtons();

    });


  // Adding a click event listener to all elements with a class of "couple-btn"
  $(document).on("click", ".couple-btn", displayCouple);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();