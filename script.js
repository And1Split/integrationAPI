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
        return 1;
    }

    function addImage(imageObj) {
        "use strict";
        $(imageContainer).append(
            $('<li>', {
                class: 'image_bloc'
            }).append(
                $('<span>', {
                    class: 'align_helper'
                })).append(
                $('<img>', {
                    src: imageObj
                })
            )
        )
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
                        if (intitCarousel()) {
                            $("#right_arrow_container").click(function() {
                                $("#carousel").animate({
                                    left: "-=158"
                                }, 400, function() {
                                    $("#carousel").append($("#carousel li").first());
                                    $("#carousel").css("left", "+=158");
                                    $("#carousel").clearQueue();
                                });
                            });
                            $("#left_arrow_container").click(function() {
                                $("#carousel").animate({
                                    left: "+=158"
                                }, 400, function() {
                                    $("#carousel").prepend($("#carousel li").last());
                                    $("#carousel").css("left", "-=158");
                                    $("#carousel").clearQueue();
                                });
                            });
                            console.log('In');
                            $.each(media.data._embedded, function(index, obj) {
                                addImage(obj.images.thumbnail);
                            })
                        } else {
                            console.log("Error: Carousel not initiated.")
                        }
                    } else {
                        console.log("Error: No image available.")
                    }
                    console.log(media);
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
