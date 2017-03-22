$(document).keypress(function (e) {
    if (e.which == 13) {
        sendQuery();
    }
});

var apikey="90c98744cc3b4105874a08f6f4b9296e"; //programmer key
var queryurl="https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/b81509fb-af34-41f9-90eb-0326bbeb3c30?subscription-key=90c98744cc3b4105874a08f6f4b9296e&verbose=true&q=";
var queryStr="";
var respText;
var callresponse="";
var TSI;

function sendQuery(){
	var query = document.getElementById("querytext").value;
	if (query==""){
		respText=" ?? ¯\_(⊙︿⊙)_/¯ ??";
		document.getElementById("responsebox").innerHTML=respText;
	}
	else {
		document.getElementById("responsebox").innerHTML="Do do do do dooooo...";
		queryStr = queryurl.concat(query);
		ajaxCall();
	}
}

function displayResponse(){
	if (TSI.score<0.2 || TSI.intent=="None"){
		respText="I dunno :("
	}
	else {
		respText = evaluateIntent();
	}
	document.getElementById("responsebox").innerHTML=respText;
}

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
			if(Math.random()>=0.5){
				return "Hi, I'm the omniscient and omnipotent RogerBot! I act and talk just like Roger, in fact, people can't even tell the difference!";
			}
			else {
				return "Hello there sentient human being! I am RogerBot!"
			}
		case 3: //about rogerbot
			return "I am RogerBot, created by Roger. I try to understand your speech through machine learning algorithms provided by Microsoft LUIS. If you want to know more about me, click the link below!";
		case 6: // jokes
			var numJokes =3
			var index = Math.floor(Math.random()*10)
			if (index%numJokes == 0){
				return "Where is the worst place to play hide and seek in a hospital? In the I.C.U.!!! Geddit??? ICU!!! HAHAHAHA sorry...";
			}
			else if (index%numJokes == 1){
				return "What kind of bagel can fly? A plane bagel!! AHAHAHAHA";
			}
			else { //(index%numJokes == 2)
				return "Why do trees seem suspicious on sunny days? Because they're shady! AHAHAHAHA!!!! I'll stop...."
			}
				
		default:
			return TSI.intent;
	}
}
