
MEET IN THE MIDDLE
-------------------

Jason Lai, Christian Casey, Andrew Smith

Ideas
------

Our original ideas for this project were for example:

- Find haunted locations in the country.
- Find out live sports information by clicking on the sports venue on a map.
- A Happy Hour locator.
- Track down the mystery Cat Serial Killer.

Meet in the Middle idea
------------------------

This idea for the app was mentioned as a good practical need from personal experience of people meeting up from different areas and meeting approximately midway to each other. Using Google maps the app would have both user's location and then would work out the approximate midway point to meetup on the map. At this midway point on the map, there would be location options like bars, restaurants etc as potential meetup places. The app would be particularly useful for giving location meetup points for an area that the users don't know. It would solve a very common issue of where to meetup when people are travelling from different areas.

Wireframes
-----------

Wireframes were used as part of the planning and user journeys. Overall they give a good indication to the layout of how each page would look. Showing the colour scheme that would be used and navigation used in a user journey. They give a very accurate look to how these pages would eventually be designed. Wireframe pages created were of the landing page, login page, register page, user page and the map page.

Application build
------------------

- This application was built using JavaScript with it's Express Framework, incorporating Node.js.

- For the front-end Bower was installed and Bootstrap, Underscore.js and jQuery were also incorporated.

- For the back-end with the API's, we used Google Maps API and also it's Places and Directions API's.

- Mongo DB is used for the database of the users, Mongoose is used as a Web Server to communicate with the database. Git was used as the version control using branches and merging. Amazon Web Services is used for the users profile image uploads. Python server was used as a local host to develop the app before it then was deployed on Heroku.

Brief timeline of build
------------------------

- Planning: wireframing using Adobe UX. Designing layout and logo - using Adobe Illustrator and UX. Preparation for app build with how many models would be used and authentication process.

- Start of the build: creating the user model, implementing the authentication using BCrypt for the registration and logging in. Research on API's, what to use and the types of data received.

- Start designing the front-end pages based on wireframing using Bootstrap.

- Google Maps API integrated into the build, setting the markers on the map for locations. Autocomplete added to assist location search for users.

- Google Places API intregrated to provide data about social meetup locations like restaurants, cafes and bars.

- Extra features were added to the project at this point: Google Maps Directions API for route calculation and direction instructions. Other features like a refresh option to restart a location search and circle radius displaying the search boundaries.

- Any Bug fixes and final design changes.

- For design responsivness, changes were also added for mobile use mainly with the buttons layout.

- Finally the site was deployed using Heroku.

How the application works:
---------------------------

- On the Landing Page: The user journey for the app begins on the landing page displaying the Meet In The Middle logo, this is where the user can login or register.

- On the Map Page: Once the user has signed up or logged in, navigation takes them to the map page displaying their current GPS location on the map and input options for inserting their start and end points.

- As the user enters the location points, red markers automatically appear on the Google map displaying that location. The user then presses the 'Find The Middle' button which then displays on the Google Map the full route from the location points. A green middle marker is also displayed to represent the middle point in the route.

- At this point an activity icons menu appears representing the potential things to do when meeting up such as for drinks, eating, shopping etc. Then for example if the user chooses the drinks icon, the map then zooms in on the middle marker within a 250 meter radius and then drops pin markers within this radius displaying potential drink locations to meetup.

- The user then chooses one of the pin markers, a pop up window appears displaying a photo, address etc of that location. If the user then chooses the directions option, the map then displays the overall route for the users start point to the meetup point they have chosen.

- At this point of the app a transport option appears where the user can choose which mode of travel they wish to find direction information for. These options include Public Transport, Walking, Driving and Cycling. By default the transport is set to Public Transport directions as it's based in London. The transport options display exact directions and total duration. At this point the overall goals of the app displaying the route, potential midway point to meet, potential meetup locations and the directions to use have been achieved.

- If the meetup involves adding or deleting people, the app allows this and can then recalculate the new middle point.

API's
------

The API's are the nucleus to how this app works. The Google Maps API provides tonnes of data on map information, place details, direction information etc. We did originally consider looking at other API's as well like TFL and Zomato but realised for the sort of information we required, Google Maps API's would be more than adequate.

- Google Maps API - is used for the map information.

- Google Places API - is used for place details, such as name, address, website. Autocomplete is incorporated to predict the potential meetup place names as the user fills in the location input boxes.

- Google Directions API - used to provide the route from the start to the end locations. Using this API the app also displays the exact direction instructions of a route via the 4 possible modes of travel: Public Transport, Walking, Driving and Cycling. It also provides the duration of a journey depending on the mode of travel.

Extra Features
----------------

- Star rating: this displays visually the user rating of the meetup place chosen from the map. The rating is given out of 5 stars.

- Start location: As the map loads originally the users start location automatically appears in the start location.

- Circle radius: This feature displays to represent the radius of the pin markers meetup locations.

- Refresh option: This allows the user to refresh the map to start a location search again.

- Drop a friend: This feature allows the user to drop a friends location if there's more than two people involved in the current location search. For example the third marker will disappear from the map when the user deletes their location, the middle marker then re-calculates the new middle point between the 2 people.

Screenshot of the landing page
-------------------------------

![mitm1](https://cloud.githubusercontent.com/assets/17442168/19133145/be256ea0-8b4e-11e6-9456-d3869b9ed77c.png)

Screenshot of two locations picked with the middle marker shown:
------------------------------------------------------------------

![mitm2](https://cloud.githubusercontent.com/assets/17442168/19133155/ca4a0240-8b4e-11e6-98e8-93069b1dcd75.png)

Screenshot of bars chosen displaying markers in the middle point radius of the location:
-----------------------------------------------------------------------------------------

![mitm3](https://cloud.githubusercontent.com/assets/17442168/19133164/d67fe106-8b4e-11e6-97eb-220b4fd72914.png)


Overall views
--------------

I think overall the app is very practical it provides a midway point destination between each users locations. Solves an issue of where to potentially meet. We were pleased with overall outcome. With the options available like restaurants and bars the app provides useful data about possible meetup places as well.
Ideally it would have been good if Google Maps Places API provided more data about particular places, but the data we used for example like a places address, it's rating was more than sufficient.

Technology used
----------------

- JavaScript using object-oriented programming 
- Node.js 
- Express.js 
- MongoDB 
- Mongoose 
- Bower 
- Bootstrap 
- Underscore.js 
- jQuery 
- Google Maps API's (Places, Directions) 
- Git 
- Heroku 
- Amazon Web Services 
- BCrypt 
- Font Awesome 
- Insomnia



