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
	if (TSI.score<0.2){
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
			return "Woah woah woah, I'm just the messenger here ok? I do what my code tells me to do!"
		case 2: //greeting
			if(Math.random()>=0.5){
				return "Hi, I'm the omniscient and omnipotent RogerBot! I act and talk just like Roger, in fact, people can't even tell the difference!";
			}
			else {
				return "Hello there sentient human being! I am RogerBot!"
			}
		case 3: //about rogerbot
			return "I am RogerBot, created by Roger. I try to understand your speech through machine learning algorithms provided by Microsoft LUIS. If you want to know more about me, click the link below!";
		default:
			return TSI.intent;
	}
}
