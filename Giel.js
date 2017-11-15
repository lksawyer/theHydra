      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
      infoWindow = new google.maps.InfoWindow;
      console.log(infoWindow);
      // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log("navigator");

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }  
 // ================================================================= 
      // Client ID and API key from the Developer Console
      var CLIENT_ID = '957547373869-me0jf26toqdej2vbqaqcnb6v6r17r9qf.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyAbFH5WoUBGwol0jmrhMD-vkxDKqSsffoU';
      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');
      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);  
      }
      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
      }
      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listUpcomingEvents();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }
      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }
      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }
      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        // var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        console.log(textContent);
        // pre.appendChild(textContent);

        $("#event-title").html(textContent);


      } 

       $("#time-now").html(new Date());//I added this to display
      function listUpcomingEvents() {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(function(response) {
          var events = response.result.items;
          appendPre('Upcoming events:');
          if (events.length > 0) {
              for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                  if (!when) {
                    when = event.start.date;
                  }
                $("#events").text("Upcoming: " + event);
                }
              } else {
            appendPre('No upcoming events found.');
          }
        });
      }
        //=====================================
        $("button").on("click", function() {
            //creating url variable
          Key = "AIzaSyAbFH5WoUBGwol0jmrhMD-vkxDKqSsffoU";
          queryURL = "https://www.googleapis.com/calendar/v3/colors?fields=calendar%2Cevent%2Ckind%2Cupdated&key="+Key;
          
          console.log(queryURL);

          $.ajax({
                url: queryURL,
                method: "GET"
              }).done(function(response) {
                console.log(response);
                var results = response.data;
                $("#color").html(results);//how to display the color??????????????
                console.log(response);
              });
        });

        //======= DATE MODIFIED =====
        function formatDate(date) {
          var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];

          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();

          return day + ' ' + monthNames[monthIndex] + ' ' + year;
        }
          // show current date-time in console

        //====another API call=======

        var s = new Date();//added this to retrieve events for one day
        console.log(formatDate(s));
        //Write start date to #display-date
        console.log("hi logan");
        console.log(s);
        $("#display-date").text(formatDate(s));
        s.setHours(1);
        s.setMinutes(0);
        s.setSeconds(0);
        console.log("s " + s);
        var d = new Date();
        d.setHours(24);
        d.setMinutes(0);
        d.setSeconds(0); 
        console.log("d " + d);
        console.log(typeof d);
        var timeMin = new Date().toISOString();

        console.log("timeMin "+ timeMin);
         function listUpcomingEvents() {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': s.toISOString(),
          'timeMax': d.toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 100,
          // 'orderBy': 'startTime'
        }).then(function(response) {
          var events = response.result.items;
          $("#events").text("Upcoming: ");
          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              //====testing time format======= 
              var dateToday = moment(when).format(" h : mm a");
              console.log("TIME TODAY " + dateToday);
              //===========
              $("#event-time").html(dateToday);
              console.log("event.start.dateTime " + when);
              console.log("response.result.items: " + response.result.items);
              console.log("THIS IS EVENTSI: " + event);
              if (!when) {
                when = event.start.date;           
                console.log("second one "+when)
              }
              appendPre(event.summary);
              $("#time").html(when);
            }
          } else {
            appendPre('No upcoming events found.');
          }
        });
      }