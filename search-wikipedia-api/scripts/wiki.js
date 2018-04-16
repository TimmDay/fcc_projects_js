/*

-in search bar, have a small cross that deletes any input text when clicked, and resets page to default

- make n64 dossier sound effect when enter pressed

- make results highlight in some james bond way when hover over them (bullet noise and crosshair?)

- if number results < 7, update number of results. maybe blame spectre or something
if (obj.query == undefined) {
    $('#subscript').html('Number of Results: 00'+i);
}

- update the lot to VANILLA JS

- in HTML, Consider using more HTML5 elements for a more semantic markup. For example: main, aside, nav, and input type=search. 

*/



//
var inputString; //to store user input


function wikiSearch() {
    //run the API when enter pressed, after URL is contructed with user input
    
    var inputStringSpaced = inputString.split(" ").join("%20");
    //alert(inputStringSpaced);
    
    var URL = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&generator=search&callback=?&utf8=1&formatversion=2&inprop=url&gsrsearch=" + inputStringSpaced + "&gsrprop=snippet";
    
    
    //alert(URL);
    
    $.getJSON(URL, updateResults);
    //getJSON from the API url, send to update func
}



function updateResults(obj) {
    //console.log(JSON.stringify(obj)) //test. see the data
    
    //update titles
    for (let i=0; i<7; i++) {
        
        var title = obj.query.pages[i].title; //get title from json
        
        $('#result'+i).html(title); //update each of 7 divs in DOM
        
        // update links 
        var underscored = title.split(" ").join("_");
        //alert(underscored);
        var linkURL = "https://en.wikipedia.org/wiki/"+underscored;
        
        $('#result'+i).attr("href", linkURL);
        
    } //end for loop
    
    
    //update snippets
    var titled = "";
    for (let i=0; i<7; i++) {
        titled = $('#result'+i).text(); //gt title from page - makes sure previous process is finished
        
        var URL = "http://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&list=&exintro=1&explaintext=1&exsectionformat=plain&origin=*&titles=" + titled;
        
         $.getJSON(URL, snipFunc); //get each snippet
        
        function snipFunc(obj) {
            //console.log(JSON.stringify(obj));

            var keyName = Object.keys(obj.query.pages)[0];
            //alert(keyName1);

            var extract = obj.query.pages[keyName].extract;
            var array = extract.split(" ");
            var shortened = "";

            for (let j=0; j<20; j++) {
                if (array[j] !== undefined) {
                    shortened += array[j]+" ";
                }
            }
            shortened += array[20]+"..."; //alert(shortened);
            
            $('#snippet'+i).html(shortened);
            
        } //end snipFunc 
    } 
    
    //upload picture of first result
    var titleForPic = (obj.query.pages[0].title).split(" ").join("%20");
    
    var picURLjson = "https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=pageimages&titles="+ titleForPic +"&pithumbsize=180";
    
    $.getJSON(picURLjson, loadPic);
    
    function loadPic(obj) {
        
        var keyId = Object.keys(obj.query.pages)[0]; //alert(keyId);
        var source = obj.query.pages[keyId].thumbnail.source; //alert(source);
        
        $('#photo').css('visibility','visible');
        $('#paperclip').css('top','12.75px');
        $('#photo-inner').css('background','url("'+source+'")');
    }
} //end update results





// EVENT HANDLING

//On mousedown, make crosshairs disappear
$('input[type="text"]').one( "mousedown", function() {
  //$('.line').css('visibility','hidden');
    //$('#instruction').css('visibility','hidden');
    $('#classified').css('visibility','hidden');
    $('#mission-notes').css('visibility','hidden');
    $('#bond-question').css('visibility','visible');
    
    //jquery to vanilla learning
    var el1 = document.getElementsByClassName('line');
    for (let i=0; i<el1.length; i++) {
        el1[i].style.visibility= 'hidden';
    }
    var el2 = document.getElementById('instruction');
    el2.style.visibility= 'hidden';
});


//on enter, perform wiki search and return result tiles, result snippets, and a thumbnail
$('#search-bar').keypress(function(e){
    if (e.which == 13) {
        $('#search-bar').css('margin-top', '0')
        //$('#input').css('border', '0.5px dashed #000000');
        $('#instruction').css('display', 'none');
        $('#question-reply').css('visibility','visible');
        $('#bond-question').css('visibility','hidden');
        inputString = $('#input').val();
        //alert(inputString); //test
        wikiSearch();
        $('#search-results').css('visibility','visible');
    }
});




