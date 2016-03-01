//Variables 
function readyFn() {
    //Variables 

    //API calls variables
    var apiKey = '0a40a13fd9d531110b4d6515ef0d6c529acdb59e81194132356a1b8903790c18';
    var apiVersion = '&v2.2'
    var baseURL = 'https://photorankapi-a.akamaihd.net';
    var mediaBaseURL;
    var apiCall = '?auth_token=' + apiKey;
    var requestParams = apiCall + '&' + apiVersion;

    //Global variables
    var imageContainer = "#carousel";


    //----- FUNCTIONS ------
    // Initiate the carsouel element
    function intitCarousel() {
        "use strict";
        $('#carousel_container').append(
            $('<div>', {
                id: 'carousel_outside_wrapper'
            }));
        $('#carousel_outside_wrapper').append(
            $('<div>', {
                id: 'left_arrow_container',
                class: 'arrow_container'
            }).html("&lt;"));
        $('#carousel_outside_wrapper').append(
            $('<div>', {
                id: 'carousel_inside_wrapper'
            }));
        $('#carousel_outside_wrapper').append(
            $('<div>', {
                id: 'right_arrow_container',
                class: 'arrow_container'
            }).html("&gt;"));
        $('#carousel_inside_wrapper').append(
            $('<ul>', {
                id: 'carousel'
            }));
        return 1; //Used to check if the creation was successful.
    }

    function addImage(imageObjThumb, imageObjOriginal) {
        "use strict"; //Needed in order to declare new DOM element using the below method
        $(imageContainer).append(
            $('<li>', {
                class: 'image_bloc'
            }).append(
                $('<span>', {
                    class: 'align_helper'
                })).append(
                $('<img>', {
                    src: imageObjThumb
                }).click(function() {
                    popInImage(imageObjOriginal); //Adding the click element to open the popin.
                })
            )
        )
    }

    //Inserting the image 'original' in the popin
    //Receive the 'original' image URL as a parameter
    function originalImageEl(imgURL) {
        var el;
        el = $('<div>', {
            id: 'popin_container'
        }).append($('<img>', {
            src: imgURL,
            id: 'popin_image'
        }))
        return el;
    }

    //Creating the modal box
    function popInImage(img) {
        var block_page = $('<div id="block_page"></div>'); // Create the blocker
        block_page.appendTo('body');
        block_page.append(originalImageEl(img));
        //Adding the close button + related animations
        $('#popin_container').append($('<div id="close_window">X</div>').click(function() {
            $('#popin_container').animate({
                opacity: 0
            }, 200, function() {
                $('#block_page').animate({
                    opacity: 0
                }, 200, function() {
                    $('#popin_container').remove();
                    $('#block_page').remove();
                });
            });
        }));
        // Checking the size of the image to apply the right classs to insure the image is automatically added in the middle of the window
        if ($('#popin_image').naturalWidth > $('#popin_image').naturalHeight) {
            $('#popin_image').addClass('horizontal');
        } else {
            $('#popin_image').addClass('vertical');
        }
        //Animate the image display once it has fully loaded
        $('#popin_image').load(function() {
            $('#popin_container').animate({
                opacity: 1
            }, 500, function() {
                // Animation complete.
            });
        });
        console.log(img);
    }

    // Retrieve the media base URL in order to retrieve content.
    $.ajax({
        type: 'GET', // define type of HTTP request
        url: baseURL + requestParams, // define request URL from above
        dataType: 'json', // define data type that we're going to be receiving
        success: function(data) {
            mediaBaseURL = 'https:' + data.data._embedded.customer._embedded['media:recent']._links.self.href;
            $.ajax({
                type: 'GET', // define type of HTTP request
                url: mediaBaseURL + requestParams, // define request URL from above
                dataType: 'json', // define data type that we're going to be receiving
                success: function(media) {
                    if (media.data._embedded.length > 0) {
                        if (intitCarousel()) { // If the carousel has initiated, adding the images and the carousel logic 
                            $("#right_arrow_container").click(function() {
                                $("#carousel").animate({
                                    left: "-=158"
                                }, 300, function() {
                                    $("#carousel").append($("#carousel li").first());
                                    $("#carousel").css("left", "+=158");
                                    $("#carousel").clearQueue();
                                });
                            });
                            $("#left_arrow_container").click(function() {
                                $("#carousel").animate({
                                    left: "+=158"
                                }, 300, function() {
                                    $("#carousel").prepend($("#carousel li").last());
                                    $("#carousel").css("left", "-=158");
                                    $("#carousel").clearQueue();
                                });
                            });
                            //Running through all the images in the JSON objesct and adding them to the carousel
                            $.each(media.data._embedded, function(index, obj) {
                                addImage(obj.images.thumbnail, obj.images.original);
                            })
                        } else {
                            console.log("Error: Carousel not initiated.")
                        }
                    } else {
                        console.log("Error: No image available.")
                    }
                },
                error: function(error) {
                    // Log error
                    console.log(error);
                }
            });
        },
        error: function(error) {
            // Log error
            console.log(error);
        }
    });
}

$(document).ready(readyFn);
