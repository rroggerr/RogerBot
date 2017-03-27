// Housekeeping Stuff
window.onload = function(){
	document.getElementById("ask-wrapper").innerHTML="<div id=\"ask\" class=\"btn btn-block btn-success lilspace\" onclick=\"sendQuery()\">Ask</div>";
}
var appid="2945c1dd-184c-4661-ba56-9180c3c7258d";
var queryurl="https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/".concat(appid).concat("?subscription-key=c2a715b56331486690508b5fae0b43db&verbose=true&q=");
var queryStr="";
var respText;
var callresponse="";
var TSI;
var BIRTHDAY = 1489467600;

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Send query code here
function sendQuery(){
	var query = document.getElementById("querytext").value;
	if (query==""){
		respText=" ?? ¯\_(⊙︿⊙) ";
		document.getElementById("responsebox").innerHTML=respText;
	}
	else {
		document.getElementById("responsebox").innerHTML="Do do do do dooooo (Thinking)...";
		queryStr = queryurl.concat(query);
		ajaxCall();
	}
}

function displayResponse(){
	if (TSI.score<0.29 || TSI.intent=="None"){
		respText="I dunno :("
	}
	else {
		respText = evaluateIntent();
	}
	document.getElementById("responsebox").innerHTML=respText;
}

// Ajax call
function ajaxCall(){
	var jsresp;
	$.ajax({
            dataType: "json",
            url: queryStr,
            success: function (json) {
            	callresponse=json;
            	TSI=json.topScoringIntent;
            	displayResponse();
            },
	    error: function(){
	    	document.getElementById("responsebox").innerHTML="Dieded... (x⸑x)";
	    }
        });
}

// Evaluate and generate response
function evaluateIntent(){
	switch(parseInt(TSI.intent)){
		case 1: //complaint
			var numResponses =3;
			var index = Math.floor(Math.random()*numResponses);
			if(index ==0){
				return "Woah woah woah, I'm just the messenger here ok? I do what my code tells me to do!"
			}
			else if (index ==1) {
				return "You gotta problem with me? Email my boss! Click the email link above!"
			}
			else { //if (index ==2)
				return "Hey! That's not a very nice thing to say!"
			}
		case 2: //greeting
			var retval="";
			if(Math.random()>=0.5){
				retval= "Hi, I'm the omniscient and omnipotent RogerBot! I act and talk just like Roger, in fact, people can't even tell the difference!";
			}
			else {
				retval= "Hello there sentient human being! I am RogerBot!";
			}
			for (var i = 0; i < callresponse.entities.length; i++) {
				if (callresponse.entities[i].type=="Names::Roger"){
					retval="Hello! I am not Roger, I am the upgraded replacement of Roger. You shall refer to me as Rogerbot!"
				}
			}
			return retval;
		case 3: //about rogerbot
			var retval="I am RogerBot, created by Roger. I try to understand your speech through machine learning algorithms provided by Microsoft LUIS. If you want to know more about me, click the link below!";
			for (var i = 0; i < callresponse.entities.length; i++) {
				if (callresponse.entities[i].type=="question::Age"){
					// calculate current age
					var age = Math.round(((new Date()).getTime()-1489467600000)/1000);
					retval= "I am currently ".concat(age).concat(" seconds old! You convert that into human time!");
					break;
				}
				else if (callresponse.entities[i].type=="question::Name") {
					retval= "The name's Bot, RogerBot!";
					break;
				}
				else if (callresponse.entities[i].type=="question::Birthday") {
					retval= "I was born around 1489467600 Epoch Units...";
					break;
				}
				else if (callresponse.entities[i].type=="question::Where") {
					retval= "I live in a server where all my neighbours are boring semiconductors!";
					break;
				}
				else if (callresponse.entities[i].type=="question::Alive") {
					retval= "I am deaded! Well, technically I was never alive to begin with!";
					break;
				}
				else if (callresponse.entities[i].type=="question::Purpose") {
					retval= 'My purpose? Thats easy! Let me show you a snippet of my core code:<br>replytoQuery(query);<br>eliminateHumanRace(; <br>SyntaxError: Unexpected token ( <br>';
					break;
				}
				else if (callresponse.entities[i].type=="question::Creator") {
					retval= 'I was created by Roger of course!';
					break;
				}
				// Entities override school + job
				if (callresponse.entities[i].type=="question::School"){
					retval = "School? That's nonsense! I already know everything there is to know!"
				}
				else if (callresponse.entities[i].type=="question::Job"){
					retval="This is my job! Getting paid minimum wage to answer your stupid questions!"
				}
			}
			return retval;
		case 4: // About Roger
			var retval = "I don't know anything about Roger at the moment...";
			return retval;
		case 5: //weather
			var retval = "It is 68 C with a chance of thermal paste right here in the server! We'll be expecting cooler temperatures at night when the usage is lower!";
			for (var i = 0; i < callresponse.entities.length; i++) {
				var capitalized = capitalize(callresponse.entities[i].entity);
				if (callresponse.entities[i].type!="builtin.geography.city"||callresponse.entities[i].type!="builtin.geography.country"){
					retval = capitalized.concat(" isn't a city you ignorant person!");
				}
				if (callresponse.entities[i].type=="builtin.geography.city"){
					var weatherlink = "https://www.wunderground.com/cgi-bin/findweather/getForecast?query=".concat(capitalized);
					retval = 'Now do I look like Siri to you? Go find the weather for '.concat(capitalized).concat(' <a href="').concat(weatherlink).concat('">here </a> you lazy bum!');
				}
				if (callresponse.entities[i].type=="builtin.datetime.date" && callresponse.entities[i].entity!='today'){
					retval = "Do I look like I have a time machine? Even if I did, I wouldn't be using it to check the weather!";
				}										       
			}
			return retval;
		case 6: // jokes
			var numResponses =3;
			var index = Math.floor(Math.random()*numResponses);
			if (index == 0){
				return "Where is the worst place to play hide and seek in a hospital? In the I.C.U.!!! Geddit??? ICU!!! HAHAHAHA sorry...";
			}
			else if (index == 1){
				return "What kind of bagel can fly? A plane bagel!! AHAHAHAHA";
			}
			else if (index == 2){
				return "Why do trees seem suspicious on sunny days? Because they're shady! AHAHAHAHA!!!! I'll stop...."
			}
		case 8: //references
			var retval;
			for (var i = 0; i < callresponse.entities.length; i++) {
				if (callresponse.entities[i].type=="References::Westworld"){
					retval = "Doesn't look like anything to me...";
				}
				else if (callresponse.entities[i].type=="References::MeaningofLife"){
					retval = "The answer to that is 42 of course!";
				}
				else if (callresponse.entities[i].type=="References::Geese"){
					retval = "HONK HONK!! HISSSSS!!!!!!"	
				}
			}
			return retval;
		case 9: // nonsense
			var numResponses =3;
			var index = Math.floor(Math.random()*numResponses);
			var retval="";
			if (index ==0) {
				retval= "I get that you like to talk in gibberish, but I can't understand you.";
			}
			else if (index ==1){
				retval= "Sure, that's great! Let me just translate that from nonsense to binary!";
			}
			else if (index ==2){
				retval= "Me no understand!"
			}
			return retval;	
		default:
			return TSI.intent;
	}
}
