(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

jQuery.get("https://www.googleapis.com/calendar/v3/calendars/ccss.carleton.ca_5q9bkrvq1iuaut07nud647vps4%40group.calendar.google.com/events?alwaysIncludeEmail=false&orderBy=startTime&showDeleted=false&singleEvents=true&key=AIzaSyAUKmclQT8DJ0v5E7LOm417IHj4ble7tDs", function(data, err){
  var calendar = data;
  var count = 0;
  var d = new Date();
  var month = d.getMonth();
  var date = d.getDate();
  var year = d.getYear();

  for(var event in calendar['items']){
    if(count >= 4) break;
    var eventDate = stripDate(calendar['items'][event]['start']['dateTime']);

    if(date <= eventDate['date'] && month <= eventDate['month'] && year <= eventDate['year']){
      listEvent(
      calendar['items'][event]['summary'],
      calendar['items'][event]['location'],
      getDate(calendar['items'][event]['start']['dateTime']),
      getTime(calendar['items'][event]['start']['dateTime']),
      getTime(calendar['items'][event]['end']['dateTime']));
      
      count++;
    }
  }
});

function getDate(string){
  string = string.substring(0, 10).split('-');
  return string[2]+", "+string[1]+", "+string[0];
}
    
function stripDate(string){
  var result = {};
  string = string.substring(0, 10).split('-');
  
  result['date'] = string[2];
  result['month'] = string[1];
  result['year'] = string[0];
  
  return result;
}

function getTime(string){
  return string.substring(11, 16);
}

function listEvent(name, location, date, start, end){
  jQuery('#calendar-list').append("<div class='event'><h5><u>"+name+"</u></h5><p>"+location+"<br>"+date+"<br>"+start+" to "+end+"</p></div>");
}
