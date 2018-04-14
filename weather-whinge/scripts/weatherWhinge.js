/* weatherWhinge.js */

/* APIs used
- Get user location by ISP - "http://ip-api.com/json"
- Get weather data for current user location - open weather app
- Get Weather data for extreme hot or cold place in a time zone at 1300h or 0200h (depending on local time and temp) - open weather app
*/


    // make toggle button that will toggle C to F

    //if data unavailable from API, just write an equation for the conversion on a button click

// calculate the magnitude difference between the temperatures
// display the magnitude difference
// display an insult that depends on the difference

// show a picture of a pathetic and cute animal that they are equivalent to if they bitch about the weather

// social. share and tweet buttons, that share the insult, magnitude, picture.



// FEATURE : GET CURRENT LOCATION then LOCAL WEATHER DATA then EXTREME WEATHER DATA //

//Update city name and country on page
//use city to build url call for the open weather app (OWA)
//use current time and temp to determine extreme city
//use extreme city to call OWA - all this is chained together because of the asynchronous thing


var getLocation = function(obj) {
    var lat = obj.lat;
    var lon = obj.lon;
    var city = obj.city;
    
    $('#location').text(city);
    $('#country').html(obj.country);
    
    //construct url for OWA call
    var APPID = "fc895b82927f93b2098abfaae01b1f5c"; //hidable for security?
    
    //var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + APPID; //for some reason, lon and lat don't always work... so ->
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city.replace(/[\W_]/g,"") + "&APPID=" + APPID;
    //removing accented characters sometimes helps - ie - Tbingen returns Tuebingen, Tübingen sometimes fails to hit.
    
    console.log(url); //test
    
    //call Open Weather and execute local update function
    $.getJSON(url, updateLocal);
};


//FUNCTION for updating the LOCAL weather data

var updateLocal = function(obj) {
    if (obj.cod == "404") {
        console.log("API failed to retrieve weather data for user location");
    }
    
    //update DOM
    $('#temperature').html(Math.round((obj.main.temp)-273.15)); //convert the kelvin input to celsius.
    $('#icon').attr("src","http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png");
    //example "http://openweathermap.org/img/w/10d.png"
    $('#condition').html(obj.weather[0].description);
    $('#humidity').html(obj.main.humidity);
    
    var windy = (Math.round((obj.wind.speed)* 1.94384 *10) / 10).toFixed(1);
    //convert m/s to knots : * 1.94384
    //convert m/s to km/h : /1000 *60 *60
    //https://www.windfinder.com/wind/windspeed.htm
    
    $('#windspeed').html(windy);
    
    // convert degrees to cardinal direction
        var degrees = obj.wind.deg;
        var segSize = 360/16; //split degrees into cardinal pie slices
        var segStart = (0 - segSize/2); //start at N, but half a range left of it.
        var segEnd = (segStart + segSize) % 360;
        //modulus 360. if we get a 361, it will bring it back to 1.
    
        var angles = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];

        var cardinal = degToCardinal(degrees);

        function degToCardinal(deg) {
            for(let i=0; i <= 16; i++) {
                if(deg >= segStart && deg < segEnd){
                    return angles[i];
                }
                segStart = (segStart + segSize) % 360;//segSize ticks over to the next slice of pie
                segEnd = (segEnd + segSize) % 360; //moves to next segment
            }
        }
    $('#direction').html(cardinal);
    
    //CALC the Target timezone for extreme weather
    
    //get current temp for choosing extreme city (hot or cold?)
    var currTemp = (obj.main.temp)-273.15;
    console.log(currTemp); //test
    
    
    //MATH for calc the target timezone.
    /* need current local time, local timezone, target time. want to find the timezone where the target time is current, and choose from extreme array based on that */
    
    var date = new Date();
    var currentHours = date.getHours();
    var currentTZ = -(date.getTimezoneOffset())/60;//returns minutes, and *-1
    
    if (currTemp > 18) {
        targetTime = 13; //cities are hot at 1pm. play up extreme
    } else if (currTemp <=18) {
        targetTime = 2; //cities are cold at 2am
    }
    
    var targetTZ = (currentTZ - (Math.abs(currentHours - targetTime))); 
    
    //keep target Time Zone on the (-12 to 0 to +12) scale
    /*make string for obj key call. diff b/w time and target time needs to be absolute - it's a magnitude.*/
    if (targetTZ < -12) {
        targetTZ = (currentTZ - (Math.abs(currentHours - targetTime))+25).toString(); 
        
    } else if (targetTZ > 12) {
        targetTZ = (currentTZ - (Math.abs(currentHours - targetTime))-24).toString()
    } else {
        targetTZ = targetTZ.toString();
    }
    
    //Hot or cold target?
    var targetTime = 2;//if API fail, default to a time for cold weather
    var cityEx = "London"; //default
    var countryEx = "UK";
    
    if (currTemp > 18) {
        cityEx = extremes[targetTZ].hot;
        countryEx = extremes[targetTZ].countryHot;
            
    } else if (currTemp <=18) {
        cityEx = extremes[targetTZ].cold;
        countryEx = extremes[targetTZ].countryCold;
    }
    
    //update on page
    $('#locationX').html(cityEx);
    $('#countryX').html(countryEx);
    $('#Xcity').html(cityEx); //for paragraph down the page
    
    
    //build URL for EXTREME api call (OWA)
    var APPID = "beb0846817578961161baec39128f125";
    var urlEx = "http://api.openweathermap.org/data/2.5/weather?q=" + cityEx.split(" ").join() + "&APPID=" + APPID;
    //needed to eliminate spaces in the string
    console.log(urlEx); //test
    
    // API CALL
    $.getJSON(urlEx, updateEXTREME);
}


// FUNCTION : update EXTREME WEATHER FEATURE //

var updateEXTREME = function(obj) {
    //function for updating the EXTREME weather data
    if (obj.cod == "404") {
        console.log("API failed to retrieve weather data for extreme weather");
    }
    $('#temperatureX').html(Math.round((obj.main.temp)-273.15)); 
        //convert the kelvin input to celsius.
    $('#iconX').attr("src","http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png");
        //"http://openweathermap.org/img/w/10d.png"
    $('#conditionX').html(obj.weather[0].description);
    $('#humidityX').html(obj.main.humidity);

    var windy = (Math.round((obj.wind.speed)* 1.94384 *10) / 10).toFixed(1); //convert m/s to knots : * 1.94384
    //https://www.windfinder.com/wind/windspeed.htm
    $('#windspeedX').html(windy);

    // convert degrees to cardinal direction
    var degrees = obj.wind.deg;
    var segSize = 360/16;
    var segStart = (0 - segSize/2); //start at N, but half a range left of it.
    var segEnd = (segStart + segSize) % 360;
    //modulus 360. if we get a 361 somehow, it will bring it back to 1.

    var angles = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];

    var cardinal = degToCardinal(degrees);

    function degToCardinal(deg) {
        for(let i=0; i <= 16; i++) {
        if(deg >= segStart && deg < segEnd){
          return angles[i];
        }
        segStart = (segStart + segSize) % 360;
        segEnd = (segEnd + segSize) % 360; //moves to next segment
      }
    }
    $('#directionX').html(cardinal);
    
    
    //JUDGEMENT
    var donk = $("#temperature").html();
    var dink = $("#temperatureX").html();
    var diff = donk - dink;
    $('#Xdiff').html(diff); //print the difference in temps to DOM

    //populate the insult
    if (donk < 5) {
        //Xdiff, Xcity, insult
        $('#insult').html(insults[0]);
    } else {
        var rand = 1 + Math.floor(Math.random()*(insults.length - 1)); //plus 1, so the happy one isn't in the random set
        $('#insult').html(insults[rand]);
    }
}

//FUTURE
//if diff < 5 make a picture of tough lumberjack
//if diff > 4, put insult in DOM and
//make picture a random cute baby animal. this is your spirit animal



// DATA STRUCTURES - hard coded //

//array of insults
var insults = [
    "little bit justified, perhaps, in your complaint.", 
    "Dead Set Dingbat", 
    "bloody bludging Bogan", 
    "Daggy Drongo", 
    "Jumped Up Galah", 
    "Rotten Rapscallion Ratbag Rascal", 
    "mere Shark Biscuit",
    "north end of a south bound camel"];

//object of objects for EXTREME CITY names in each timezone
var extremes = {
    "12": {"hot":"Palikir", "countryHot" :"Micronesia", "cold": "Queenstown, NZ", "countryCold":"New Zealand"},
    "11": 
        {"hot":"Nukualofa", "countryHot" :"Tonga", "cold": "Bilibino", "countryCold":"Russia"},
    "10": 
        {"hot":"Port Moresby", "countryHot" :"Papua New Guinea", "cold": "Deputatskiy", "countryCold":"Russia"},
    "9": 
        {"hot":"Darwin", "countryHot" :"Australia", "cold": "Yakutsk", "countryCold":"Russia"},
    "8": 
        {"hot":"Jakarta", "countryHot" :"Indonesia", "cold":"Deputatskiy", "countryCold":"Russia"},
    "7": 
        {"hot":"Sabang", "countryHot" :"Indonesia", "cold":"Baykit", "countryCold":"Russia"},
    "6": 
        {"hot":"Barisal", "countryHot" :"Bangladesh", "cold": "Olenek", "countryCold":"Russia"},
    "5": 
        {"hot":"Bhuj", "countryHot" :"India", "cold": "Tazovskiy", "countryCold":"Russia"},
    "4": 
        {"hot":"Muscat", "countryHot" :"Oman", "cold": "Ustye", "countryCold":"Russia"},
    "3": 
        {"hot":"Khartoum", "countryHot" :"Sudan", "cold": "Kovdor", "countryCold":"Russia"},
    "2": 
        {"hot":"Abu Simbel", "countryHot" :"Egypt", "cold": "Utsjoki", "countryCold":"Finland"},
    "1": 
        {"hot":"Niamey", "countryHot" :"Niger", "cold": "Longyearbyen", "countryCold":"Netherlands"},
    "0": 
        {"hot":"Dakar", "countryHot" :"Senegal", "cold": "Reykjavik", "countryCold":"Iceland"},
    "-1": 
        {"hot":"Praia", "countryHot" :"Cape Verde", "cold": "Isafjoerdur", "countryCold":"Iceland"},
    "-2": 
        {"hot":"Ponta Delgada", "countryHot" :"Portugal", "cold": "Ilulissat", "countryCold":"Greenland"},
    "-3": 
        {"hot":"Macapa", "countryHot" :"Brazil", "cold": "Grytviken", "countryCold":"South Sandwich Islands"},
    "-4": 
        {"hot":"Paramaribo", "countryHot" :"Suriname", "cold": "Sisimiut", "countryCold":"Greenland"},
    "-5": 
        {"hot":"Leguizamo", "countryHot" :"Colombia", "cold": "Arctic Bay", "countryCold":"Canada"},
    "-6": 
        {"hot":"Salina Cruz", "countryHot" :"Mexico", "cold": "Resolute", "countryCold":"Canada"},
    "-7": 
        {"hot":"Navojoa", "countryHot" :"Mexico", "cold": "Paulatuk", "countryCold":"Canada"},
    "-8": 
        {"hot":"Los Angeles", "countryHot" :"United States", "cold": "Burwash Landing", "countryCold":"Canada"},
    "-9": 
        {"hot":"Bakersfield",/*only ocean, so another -9*/ "countryHot" :"United States", "cold": "Arctic Village", "countryCold":"United States"},
    "-10": 
        {"hot":"Honolulu", "countryHot" :"United States", "cold": "Barrow",/*alaska, -9*/ "countryCold":"United States"},
    "-11": 
        {"hot":"Apia",/*offset*/ "countryHot" :"Samoa", "cold": "Egvekinot", "countryCold":"Russia"},
    "-12": 
        {"hot":"Palikir", "countryHot" :"Micronesia", "cold": "Invercargill", "countryCold":"New Zealand"}
};



// PAGE LOAD

$(document).ready(function() {
    $.getJSON("http://ip-api.com/json", getLocation); //starts API call chain
});


// BUTTONS

// toggle temperature units between c and f
$('.toggle-temp').click(function(){
    
    //if loop to check celsius or fahrenheit class, then act appropriately to swap and change
    
    if ($('.toggle-temp').hasClass('celcius')) {
        
        //units change C to F
        $('.toggle-temp').text('F');
        
        //temperature numeric changes from C to F value
        var tempLeft = Math.round($('#temperature').text() * 9/5 + 32);
        var tempRight = Math.round($('#temperatureX').text() * 9/5 + 32);
        var tempBase = Math.round($('#Xdiff').html() * 9/5 + 32);
        
        //remove celcius class, add fahrenheit
        $('.toggle-temp').removeClass('celcius').addClass('fahrenheit');
        
    } else if ($('.toggle-temp').hasClass('fahrenheit')) {
        
        //units change F to C
        $('.toggle-temp').text('C');
        
        //temperature numeric changes from F to C value
        var tempLeft = Math.round(($('#temperature').text() - 32) * 5/9);
        var tempRight = Math.round(($('#temperatureX').text() - 32) * 5/9);
        var tempBase = Math.round(($('#Xdiff').text() - 32) * 5/9);
        
        //remove fahrenheit class, add celcius
        $('.toggle-temp').removeClass('fahrenheit').addClass('celcius');
    }
    
    //publish the post-click-calculated temperature to the page
    $('#temperature').html(tempLeft);
    $('#temperatureX').html(tempRight);
    $('#Xdiff').html($('#temperature').html() - $('#temperatureX').html());
    
});



