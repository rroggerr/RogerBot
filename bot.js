// Housekeeping Stuff
window.onload = function(){
	document.getElementById("ask-wrapper").innerHTML="<div id=\"ask\" class=\"btn btn-block btn-success lilspace\" onclick=\"sendQuery()\">Ask</div>";
}
var queryurl="https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/b81509fb-af34-41f9-90eb-0326bbeb3c30?subscription-key=90c98744cc3b4105874a08f6f4b9296e&verbose=true&q=";
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
            }
        });
}

// Evaluate and generate response
function evaluateIntent(){
	switch(parseInt(TSI.intent)){
		case 1: //insult
			if(Math.random()>=0.5){
				return "Woah woah woah, I'm just the messenger here ok? I do what my code tells me to do!"
			}
			else {
				return "You gotta problem with me? Email my boss! Click the email link above!"
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
			}
			return retval;
		case 5:
			retval = "It is 68 C with a chance of thermal paste right here in the server! We'll be expecting cooler temperatures at night when the usage is lower!";
			for (var i = 0; i < callresponse.entities.length; i++) {
				var capitalized = capitalize(callresponse.entities[i].entity);
				if (callresponse.entities[i].type!="builtin.geography.city"||callresponse.entities[i].type!="builtin.geography.country"){
					retval = capitalized.concat(" isn't a city you ignorant person!");
				}
				if (callresponse.entities[i].type=="builtin.geography.city"){
					var weatherlink = "https://www.wunderground.com/cgi-bin/findweather/getForecast?query=".concat(capitalized);
					retval = "Now do I look like Siri to you? Go find your own weather here you lazy bum! ".concat(weatherlink);
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
