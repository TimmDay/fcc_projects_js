# JS-R2D2-Calc
[LIVE DEMO](http://www.timmday.com/projects/jsCalc/calculator-index.html)

Try to find the six blue buttons that unleashed easter eggs.

## CSS
I decided to try and push my CSS skills, and started this project with the visual frame. It has some funky shapes and a lot of litte components.
I am quite happy with how R2D2 visually turned out, but there remains some cross-browser compatibility with r2D2's head.
I think it is this line: border-radius: 65% 65% 50% 50% / 270% 270% 30% 30%;
It works in chrome, but gets a little chopped in mozilla. I didn't even look at IE and hopefully nobody ever does.

My HTML and CSS is a little messy, and could probably use some cleaning. I'll wait until the JS is working perfectly before I refactor it again.

## Javascript
My decision to abandon JQuery and learn Javascript from the ground up has been painful. But I am very grateful that I am learning how it all comes together.
I have spent a lot of time reading MDN docs, and I should shout out to Gordon Zhu's [fantastic free course](https://watchandcode.com) for showing me how to use the Model View Controller Model. I set up the model first and tested it in the console. The logic took some fiddling, but it works!
The buttons and visualisation is a little more fiddly, especially without jquery and because I built the HTML CSS first, but knowing that the thing works prior to connecting listeners to buttons to logic helps.

There were some challenges getting the display to dynamically resize the font depending on how wide the number was.

Super weird bug with exponential notation.. e+numbers fit on one line, while e-numbers go to two.
