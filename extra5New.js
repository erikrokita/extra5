var body = $("body");
var btns = [$("#RED"), $("#BLUE"), $("#YELLOW"), $("#GREEN")];	//array of buttons
var randBtns = [];		//holds new buttons
var level = -1;			//level
var randBtnIndex = [];	//holds indicies of randbtns to read from
var prevIndexSearch;	//holds value for previous buttons being searched
var prevIndexClick;		//holds value for current index user must click

//begin button
$("#start").click(function(){
	$("#start").hide();		//hide start game button
	genSet();
});

//generates random numbers
function genSet(){
	prevIndexClick = 0;			//resets index of prev button user must click to progress
	prevIndexSearch = 0;		//resets index to read previous buttons from the beginning
	genRepeat();		
}

function genRepeat(){
	
	if (!(prevIndexSearch >= randBtns.length)){
		//goes through previous button sequence
		for (i = 0; i < randBtns.length; i++){
			delay = setTimeout(function(){
				console.log("---Prev Button---");
				console.log("prev: " + randBtnIndex[prevIndexSearch] + " " + randBtns[prevIndexSearch]);	//DEBUG: shows what button must be pressed
				nextButton(randBtns[prevIndexSearch]);			//shows the previous button that must be clicked
				console.log("prevIndexSearch: " + prevIndexSearch);	//shows value of prevIndexSearch
				prevIndexSearch++;								//increases index of the buttons being searched
				console.log("Color brighten delay: " + (500 + (prevIndexSearch * 500)));		//display delay between brightening a new button
				setTimeout(delay);
			}, 500 + (prevIndexSearch * 500));		//every next index being read from prev buttons, add delay before displaying
		}
	}
		//adds new button to sequence
		delayNew = setTimeout(function(){
			var randNum = Math.floor((Math.random() * 4));	//generates a random number
			level ++;										//increases level
			console.log("---New Button---");
			console.log("level: " + parseInt(level + 1));	//DEBUG: display level
			randBtns.push(btns[randNum]);					//adds button to the randBtns array based on randum number
			randBtnIndex.push(randNum);						//adds random number to array to save index of new button above
			console.log("new: " + randNum + " (" + btns[randNum] + ")");	//DEBUG: displayed new button
			nextButton(btns[randNum]);						//shows new button on display
			clearTimeout(delayNew);
		}, 1000 + (prevIndexSearch * 500));			//every next index being read from prev buttons, add delay before displaying
}

//check for button clicks
btns[0].click(function(){
	console.log("clicked: 0");
	checkBtn(0);
});
btns[1].click(function(){
	console.log("clicked: 1");
	checkBtn(1);
});
btns[2].click(function(){
	console.log("clicked: 2");
	checkBtn(2);
});
btns[3].click(function(){
	console.log("clicked: 3");
	checkBtn(3);
});

//brightens button and shows in game
function nextButton(obj){
	var prevBGColor = obj.css("background-color");	//sets buttons color before brightening it
	var prevBodyBGColor = body.css("background");	//sets DOM bg before changing it
	console.log("Color of: " + randBtnIndex[prevIndexSearch] + " " + obj.css("background-color"));		//DEBUG: output color before brighten
	if (randBtnIndex[prevIndexSearch] == 0){
		obj.css("background-color", "rgba(255, 50, 50, .75)");	//brightens button color
		body.css("background", "radial-gradient(rgb(255, 175, 175), rgb(50, 50, 50) 75%)");	//changes DOM bg
	}else if (randBtnIndex[prevIndexSearch] == 1){
		obj.css("background-color", "rgba(50, 50, 255, .75)");	//brightens button color
		body.css("background", "radial-gradient(rgb(175, 175, 255), rgb(50, 50, 50) 75%)");	//changes DOM bg
	}else if (randBtnIndex[prevIndexSearch] == 2){
		obj.css("background-color", "rgba(255, 255, 50, .75)");	//brightens button color
		body.css("background", "radial-gradient(rgb(255, 255, 175), rgb(50, 50, 50) 75%)");	//changes DOM bg
	}else if (randBtnIndex[prevIndexSearch] == 3){
		obj.css("background-color", "rgba(50, 255, 50, .75)");	//brightens button color
		body.css("background", "radial-gradient(rgb(175, 255, 175), rgb(50, 50, 50) 75%)");	//changes DOM bg
	}
	console.log("Color of: " + randBtnIndex[prevIndexSearch] + " " + obj.css("background-color"));		//DEBUG: output color after brighten
	
	fadeColor = setTimeout(function(){
		obj.css("background-color", prevBGColor);	//sets color back to normal after brighten
		body.css("background", prevBodyBGColor);	//sets DOM bg back to normal
		console.log("Color of: " + randBtnIndex[prevIndexSearch] + " " + obj.css("background-color"));	//DEBUG: output color after normal
		console.log();
		clearTimeout(fadeColor);
	}, 250 + (prevIndexSearch * 500));
}

//check if pressed button is correct
function checkBtn(clickval){
	if (clickval == randBtnIndex[prevIndexClick]){
		prevIndexClick ++;
		console.log("Correct!");
		if (prevIndexClick >= randBtns.length){
			console.log("-----Loading new set-----");
			genSet();	//only call function when the index value the user has to click is greater than the randBtns array, signaling that the user has clicked all the buttons required
		}
	}else{
		prevIndexClick = -1;
		console.log("Wrong!");
	}
}