# integrationAPI
Integration using the Olapic API.

Below are the details of my development in terms of thoughts process.

#Initialisation
Firest things first, initialisation with a default reset CSS file and a basic HTML5 file referencing the CSS file, the JS script and jQuery in order to develop the carrousel.

#Creating the carousel
The HTML file is kept pretty basic as everything will be injected directly using jQuery/AJAX. We only need to define a placeholder in the file to define where the content will be injected. > <div id="carousel_container"></div>

Before thinking about retrieving content to inject, we need to build the carousel that will be used to display the images.
The function intitCarousel() will be called to create the structure of the carousel that needs to be injected in the DOM.
It returns 1 to indicate that the initiation of the carousel has worked.

#Retrieving the images
In order to retrieve the images, I made a first call to the API with the only information available: the API key.
By doing so, we retrieve an object that contains the customer informations and also some media content links.
Client requested the latest images to be displayed in the carousel so the recent media seems to fit the bill perfectly.
The second AJAX call is then used to retrieve this content -> 20 images.

Once we have made sure we have some content available, we trigger the creation of the carousel that wil host the images and then recursively inject all the images available > $.each(...).
The function addImage(imageObjThumb, imageObjOriginal) {} is used to both inject the 'thumbnail' image and bind a click event to it that will be used to open the modal box and display the 'normal' size image.

We now have a simple carousel with the 20 latest pictures, with left and right navigation arrows and which display 6 pictures at any given time.

#Modal box
The display of the modal box is done through the use of the function popInImage(img) {} that receive as a parameter the URL to the 'normal' size version of the image. The function first add a blocker to slightly hide the page to bring the attention to the pictures that is about to be displayed. The picture is then added to the DOM alongside the 'close' button. When clicking on the close button, the blocker and the image container are removed from the DOM putting it back to it original state.
