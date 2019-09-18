// Array of Buttons // 
var gifTasticle = [
    "New Yory",
    "Miami",
    "Nashville",
    "Palm Springs",
    "Phoenix",
    "Chicago",
    "Houston",
    "Dallas",
    "Columbus",
    "Charlotte",
    "Seattle",
    "Detroit",
    "Boston",
    "Las Vegas",
    "Tucson",
    "Wichita"]


// Creates a New Button	//
function createButtons() {
    var $giphyButtons = $('.giphyButtons');
    // Empty of existing buttons
    $giphyButtons.empty();
    // Build jquery button object and append
    $.each(gifTasticle, function (index, value) {
        var $itemButton = $('<button>')
            .attr("data-dessert", value)
            .text(value)
            .addClass("btn btn-default giphyButton")
            .on("click", clickGiphyButton)
            .appendTo($giphyButtons);
    })
};


// OnClick to start search //
function clickGiphyButton() {

    var search = $(this).data('dessert');

    // Replaces spaces with "+" //
    search = search.replace(" ", "+");

    // Ajax //
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search",
        data: {
            limit: 12,
            api_key: "t7L4fRfqSRx96gkzHLXA4s2ibVdaGXfA",
            q: search
        },
        method: 'GET'
    })
        .done(function (response) {
            var results = response.data;
            var gifHolder = $('.giphyImages');

            // Empty images //
            gifHolder.empty();
            $.each(results, function (key) {

                // Create DIV = cityDiv //
                var $cityDiv = $('<div>').addClass("cityImg");

                
                var $rating = $('<p>').text("Rating: " + results[key].rating).addClass("rating");
                // Start/Stop image //
                
                var $cityImg = $('<img>').attr('src', results[key].images.fixed_height_still.url)
                    .attr('data-still', results[key].images.fixed_height_still.url)
                    .attr('data-animate', results[key].images.fixed_height.url)
                    .attr('data-state', 'still')
                    .addClass('cover')
                    .on('click', function () {
                        var state = $(this).data('state');
                        if (state == 'still') {
                            $(this).data('state', 'animate');
                            $(this).attr('src', $(this).data('animate'));
                        }
                        else {
                            $(this).data('state', 'still');
                            $(this).attr('src', $(this).data('still'));
                        }
                    });
                $cityDiv.append($rating);
                $cityDiv.append($cityImg);
                gifHolder.append($cityDiv);

                $(".addButton").css("border-bottom-right-radius", "0");
                $(".addButton").css("border-bottom-left-radius", "0");
            });
        });
};


// Create new Buttons and check for existing //
$("#addButton").on("click", function () {
    var txtInput = $("#addButtonText").val().trim();
    
    if (gifTasticle.indexOf(txtInput) == -1 && txtInput.length > 0) {
        gifTasticle.push(txtInput);
        $('#addButtonText').val("");
        $('#addButtonText').focus();
        createButtons();
    }
    return false;
});


$(document).ready(function () {
    createButtons();
});
